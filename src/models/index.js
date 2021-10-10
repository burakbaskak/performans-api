const mongoose = require('mongoose');

const Analytic = require('./analytic');
const ResourceAnalytic = require('./resourceAnalytic');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

const models = { Analytic, ResourceAnalytic };

exports.connectDb = connectDb;
exports.models = models;
