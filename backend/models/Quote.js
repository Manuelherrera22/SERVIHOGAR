const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'El monto es requerido'],
    min: [0, 'El monto debe ser positivo']
  },
  description: {
    type: String,
    required: [true, 'La descripción de la cotización es requerida']
  },
  estimatedHours: {
    type: Number,
    default: 1
  },
  materials: [{
    name: String,
    quantity: Number,
    cost: Number
  }],
  laborCost: {
    type: Number,
    required: true
  },
  materialsCost: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    }
  },
  acceptedAt: {
    type: Date
  },
  rejectedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
quoteSchema.index({ service: 1, technician: 1 });
quoteSchema.index({ status: 1, expiresAt: 1 });

module.exports = mongoose.model('Quote', quoteSchema);


