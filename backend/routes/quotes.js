const express = require('express');
const { body, validationResult } = require('express-validator');
const Quote = require('../models/Quote');
const Service = require('../models/Service');
const { protect, isTechnician } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/quotes
// @desc    Create quote for service
// @access  Private (Technician only)
router.post('/', protect, isTechnician, [
  body('service').notEmpty().withMessage('El servicio es requerido'),
  body('amount').isFloat({ min: 0 }).withMessage('El monto debe ser un número positivo'),
  body('description').trim().notEmpty().withMessage('La descripción es requerida'),
  body('laborCost').isFloat({ min: 0 }).withMessage('El costo de mano de obra debe ser positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { service, amount, description, estimatedHours, materials, laborCost, materialsCost } = req.body;

    // Check if service exists
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Check if service is still available
    if (serviceDoc.status !== 'pending' && serviceDoc.status !== 'quoted') {
      return res.status(400).json({
        success: false,
        message: 'Este servicio ya no está disponible para cotizar'
      });
    }

    // Check if technician already quoted
    const existingQuote = await Quote.findOne({
      service,
      technician: req.user._id,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingQuote) {
      return res.status(400).json({
        success: false,
        message: 'Ya has enviado una cotización para este servicio'
      });
    }

    // Create quote
    const quote = await Quote.create({
      service,
      technician: req.user._id,
      amount,
      description,
      estimatedHours: estimatedHours || 1,
      materials: materials || [],
      laborCost,
      materialsCost: materialsCost || 0
    });

    // Update service status
    serviceDoc.status = 'quoted';
    await serviceDoc.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`service-${service}`).emit('new-quote', quote);
      io.to(`user-${serviceDoc.user}`).emit('quote-received', quote);
    }

    res.status(201).json({
      success: true,
      quote: await quote.populate('technician', 'name phone avatar technicianProfile')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear cotización',
      error: error.message
    });
  }
});

// @route   GET /api/quotes
// @desc    Get quotes (filtered by user)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'user') {
      // Users see quotes for their services
      const services = await Service.find({ user: req.user._id }).select('_id');
      query.service = { $in: services.map(s => s._id) };
    } else if (req.user.role === 'technician') {
      // Technicians see their own quotes
      query.technician = req.user._id;
    }

    const quotes = await Quote.find(query)
      .populate('service', 'title description category status')
      .populate('technician', 'name phone avatar technicianProfile')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: quotes.length,
      quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cotizaciones',
      error: error.message
    });
  }
});

// @route   PUT /api/quotes/:id/accept
// @desc    Accept quote
// @access  Private (User only)
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('service')
      .populate('technician');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    // Check if user owns the service
    if (quote.service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Check if quote is still valid
    if (quote.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Esta cotización ya no está disponible'
      });
    }

    if (quote.expiresAt < new Date()) {
      quote.status = 'expired';
      await quote.save();
      return res.status(400).json({
        success: false,
        message: 'Esta cotización ha expirado'
      });
    }

    // Reject other quotes for this service
    await Quote.updateMany(
      {
        service: quote.service._id,
        _id: { $ne: quote._id },
        status: 'pending'
      },
      {
        status: 'rejected',
        rejectedAt: new Date()
      }
    );

    // Accept this quote
    quote.status = 'accepted';
    quote.acceptedAt = new Date();
    await quote.save();

    // Update service
    const service = await Service.findById(quote.service._id);
    service.status = 'accepted';
    service.acceptedQuote = quote._id;
    service.assignedTechnician = quote.technician._id;
    await service.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`service-${service._id}`).emit('quote-accepted', quote);
      io.to(`technician-${quote.technician._id}`).emit('quote-accepted', quote);
    }

    res.json({
      success: true,
      quote,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al aceptar cotización',
      error: error.message
    });
  }
});

// @route   PUT /api/quotes/:id/reject
// @desc    Reject quote
// @access  Private (User only)
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('service');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    if (quote.service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    if (quote.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Esta cotización ya no está disponible'
      });
    }

    quote.status = 'rejected';
    quote.rejectedAt = new Date();
    await quote.save();

    res.json({
      success: true,
      quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al rechazar cotización',
      error: error.message
    });
  }
});

module.exports = router;


