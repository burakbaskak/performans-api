const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const analyticSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Double,
  },
  createText: {
    type: String,
  },
  created_on: {
    type: Date,
  },
});

const Analytic = mongoose.model('Analytic', analyticSchema);

module.exports = Analytic;
