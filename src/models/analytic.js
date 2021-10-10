import mongoose from 'mongoose';
import Double from '@mongoosejs/double';

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

export default Analytic;
