const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['plomeria', 'electricidad', 'cerrajeria', 'gas', 'pintura', 'carpinteria', 'mantenimiento', 'otros']
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  acceptedQuote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    default: null
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  completedAt: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String
  }
}, {
  timestamps: true
});

// Index for geolocation queries
serviceSchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Service', serviceSchema);


