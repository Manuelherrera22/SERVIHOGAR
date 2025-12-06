const express = require('express');
const Service = require('../models/Service');
const { protect, isTechnician } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/technicians/available-services
// @desc    Get available services for technician
// @access  Private (Technician)
router.get('/available-services', protect, isTechnician, async (req, res) => {
  try {
    const specialties = req.user.technicianProfile?.specialties || [];
    
    const services = await Service.find({
      category: { $in: specialties },
      status: { $in: ['pending', 'quoted'] }
    })
      .populate('user', 'name phone address')
      .sort({ urgency: -1, createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener servicios disponibles',
      error: error.message
    });
  }
});

// @route   GET /api/technicians/my-services
// @desc    Get technician's assigned services
// @access  Private (Technician)
router.get('/my-services', protect, isTechnician, async (req, res) => {
  try {
    const services = await Service.find({
      assignedTechnician: req.user._id,
      status: { $in: ['accepted', 'in_progress', 'completed'] }
    })
      .populate('user', 'name phone address')
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

module.exports = router;


