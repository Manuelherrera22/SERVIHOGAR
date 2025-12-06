const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../utils/uploadImage');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, upload.single('avatar'), async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = JSON.parse(address);
    if (req.file) user.avatar = req.file.path;

    await user.save();

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    });
  }
});

// @route   PUT /api/users/technician-profile
// @desc    Update technician profile
// @access  Private (Technician)
router.put('/technician-profile', protect, async (req, res) => {
  try {
    if (req.user.role !== 'technician') {
      return res.status(403).json({
        success: false,
        message: 'Solo técnicos pueden actualizar este perfil'
      });
    }

    const { specialties, experience, certifications } = req.body;
    const user = await User.findById(req.user._id);

    if (!user.technicianProfile) {
      user.technicianProfile = {};
    }

    if (specialties) user.technicianProfile.specialties = specialties;
    if (experience !== undefined) user.technicianProfile.experience = experience;
    if (certifications) user.technicianProfile.certifications = certifications;

    await user.save();

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil de técnico',
      error: error.message
    });
  }
});

// @route   GET /api/users/technicians
// @desc    Get all technicians
// @access  Public
router.get('/technicians', async (req, res) => {
  try {
    const { category, city } = req.query;
    let query = { role: 'technician', isActive: true };

    if (category) {
      query['technicianProfile.specialties'] = category;
    }

    const technicians = await User.find(query)
      .select('name email phone avatar technicianProfile address')
      .sort({ 'technicianProfile.rating': -1 });

    res.json({
      success: true,
      count: technicians.length,
      technicians
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener técnicos',
      error: error.message
    });
  }
});

module.exports = router;


