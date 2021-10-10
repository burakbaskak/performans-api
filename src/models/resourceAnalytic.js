const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const resourceAnalyticSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Double,
  },
  initiatorType: {
    type: String,
  },
  created_on: {
    type: Date,
    index: true,
  },
});

const ResourceAnalytic = mongoose.model(
  'ResourceAnalytic',
  resourceAnalyticSchema,
);

module.exports = ResourceAnalytic;
