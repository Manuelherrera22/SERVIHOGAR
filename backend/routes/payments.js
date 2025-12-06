const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Quote = require('../models/Quote');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/create-intent
// @desc    Create payment intent
// @access  Private
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { quoteId } = req.body;

    const quote = await Quote.findById(quoteId)
      .populate('service')
      .populate('technician');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    // Check if quote is accepted
    if (quote.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'La cotización debe estar aceptada para realizar el pago'
      });
    }

    // Check if user owns the service
    if (quote.service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({
      quote: quoteId,
      status: { $in: ['pending', 'processing', 'completed'] }
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un pago para esta cotización',
        payment: existingPayment
      });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(quote.amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        quoteId: quote._id.toString(),
        serviceId: quote.service._id.toString(),
        userId: req.user._id.toString(),
        technicianId: quote.technician._id.toString()
      }
    });

    // Create payment record
    const payment = await Payment.create({
      service: quote.service._id,
      quote: quoteId,
      user: req.user._id,
      technician: quote.technician._id,
      amount: quote.amount,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear intención de pago',
      error: error.message
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId)
      .populate('service')
      .populate('quote');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Pago no encontrado'
      });
    }

    if (payment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.stripePaymentIntentId
    );

    if (paymentIntent.status === 'succeeded') {
      payment.status = 'completed';
      payment.paidAt = new Date();
      payment.stripeChargeId = paymentIntent.latest_charge;
      await payment.save();

      // Update service status
      const service = await Service.findById(payment.service._id);
      service.status = 'in_progress';
      await service.save();

      // Emit socket event
      const io = req.app.get('io');
      if (io) {
        io.to(`service-${service._id}`).emit('payment-completed', payment);
        io.to(`technician-${payment.technician}`).emit('payment-received', payment);
      }

      res.json({
        success: true,
        payment
      });
    } else {
      payment.status = 'failed';
      await payment.save();

      res.status(400).json({
        success: false,
        message: 'El pago no se completó',
        payment
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al confirmar pago',
      error: error.message
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Stripe webhook handler
// @access  Public (Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Update payment status
    const payment = await Payment.findOne({
      stripePaymentIntentId: paymentIntent.id
    });

    if (payment) {
      payment.status = 'completed';
      payment.paidAt = new Date();
      payment.stripeChargeId = paymentIntent.latest_charge;
      await payment.save();

      // Update service status
      const service = await Service.findById(payment.service);
      if (service) {
        service.status = 'in_progress';
        await service.save();
      }

      // Emit socket event
      const io = req.app.get('io');
      if (io) {
        io.to(`service-${service._id}`).emit('payment-completed', payment);
        io.to(`technician-${payment.technician}`).emit('payment-received', payment);
      }
    }
  }

  res.json({ received: true });
});

// @route   GET /api/payments
// @desc    Get user payments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'user') {
      query.user = req.user._id;
    } else if (req.user.role === 'technician') {
      query.technician = req.user._id;
    }

    const payments = await Payment.find(query)
      .populate('service', 'title category')
      .populate('quote')
      .populate('user', 'name email')
      .populate('technician', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener pagos',
      error: error.message
    });
  }
});

module.exports = router;


