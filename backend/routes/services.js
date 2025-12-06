const express = require('express');
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const Quote = require('../models/Quote');
const { protect } = require('../middleware/auth');
const upload = require('../utils/uploadImage');

const router = express.Router();

// @route   POST /api/services
// @desc    Create service request
// @access  Private
router.post('/', protect, upload.array('images', 5), [
  body('category').isIn(['plomeria', 'electricidad', 'cerrajeria', 'gas', 'pintura', 'carpinteria', 'mantenimiento', 'otros']).withMessage('Categoría inválida'),
  body('title').trim().notEmpty().withMessage('El título es requerido'),
  body('description').trim().notEmpty().withMessage('La descripción es requerida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { category, title, description, address, urgency, preferredDate, preferredTime } = req.body;

    // Process uploaded images
    const images = req.files ? req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      publicId: file.filename
    })) : [];

    const service = await Service.create({
      user: req.user._id,
      category,
      title,
      description,
      images,
      address: address ? JSON.parse(address) : undefined,
      urgency: urgency || 'medium',
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime
    });

    // Emit socket event for technicians
    const io = req.app.get('io');
    if (io) {
      io.to('technicians').emit('new-service', service);
    }

    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear solicitud de servicio',
      error: error.message
    });
  }
});

// @route   GET /api/services
// @desc    Get all services (filtered by user role)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    // Users see only their services
    if (req.user.role === 'user') {
      query.user = req.user._id;
    }

    // Technicians see services in their specialties
    if (req.user.role === 'technician') {
      const specialties = req.user.technicianProfile?.specialties || [];
      if (specialties.length > 0) {
        query.category = { $in: specialties };
      }
      // Only show pending or quoted services
      query.status = { $in: ['pending', 'quoted'] };
    }

    const services = await Service.find(query)
      .populate('user', 'name email phone')
      .populate('assignedTechnician', 'name phone')
      .populate('acceptedQuote')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener servicios',
      error: error.message
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('assignedTechnician', 'name phone avatar technicianProfile')
      .populate({
        path: 'acceptedQuote',
        populate: {
          path: 'technician',
          select: 'name phone avatar technicianProfile'
        }
      });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Check access
    if (req.user.role === 'user' && service.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Get quotes for this service
    const quotes = await Quote.find({ service: service._id })
      .populate('technician', 'name phone avatar technicianProfile')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      service,
      quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener servicio',
      error: error.message
    });
  }
});

// @route   PUT /api/services/:id/status
// @desc    Update service status
// @access  Private
router.put('/:id/status', protect, [
  body('status').isIn(['pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled']).withMessage('Estado inválido')
], async (req, res) => {
  try {
    const { status } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Check permissions
    if (req.user.role === 'user' && service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    service.status = status;
    if (status === 'completed') {
      service.completedAt = new Date();
    }

    await service.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`service-${service._id}`).emit('service-updated', service);
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar servicio',
      error: error.message
    });
  }
});

// @route   POST /api/services/:id/rating
// @desc    Rate completed service
// @access  Private
router.post('/:id/rating', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser entre 1 y 5'),
  body('review').optional().trim()
], async (req, res) => {
  try {
    const { rating, review } = req.body;
    const service = await Service.findById(req.params.id)
      .populate('assignedTechnician');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    if (service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    if (service.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden calificar servicios completados'
      });
    }

    service.rating = rating;
    service.review = review;
    await service.save();

    // Update technician rating
    if (service.assignedTechnician) {
      const User = require('../models/User');
      const technician = await User.findById(service.assignedTechnician._id);
      if (technician.technicianProfile) {
        const totalReviews = technician.technicianProfile.totalReviews + 1;
        const currentRating = technician.technicianProfile.rating || 0;
        const newRating = ((currentRating * (totalReviews - 1)) + rating) / totalReviews;
        
        technician.technicianProfile.rating = newRating;
        technician.technicianProfile.totalReviews = totalReviews;
        await technician.save();
      }
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al calificar servicio',
      error: error.message
    });
  }
});

module.exports = router;

