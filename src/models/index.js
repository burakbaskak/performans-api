import mongoose from 'mongoose';

import Analytic from './analytic';
import ResourceAnalytic from './resourceAnalytic';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

const models = { Analytic, ResourceAnalytic };

export { connectDb };

export default models;
