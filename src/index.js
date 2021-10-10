const serverless = require('serverless-http');
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import multer from 'multer';

import models, { connectDb } from './models';
import routes from './routes';

var upload = multer();
const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// * Routes * //

app.use('/analytics', routes.analytic);
app.use('/resource-analytics', routes.resourceAnalytic);
app.use('/.netlify/functions/server', router); // path must route to lambda

app.get('/', (req, res) => {
  res.send(
    '<h1 style="text-align:center;margin-top:10%">Trendyol Case - Backend App</h1>',
  );
});

// * Start * //
connectDb().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

module.exports = app;
module.exports.handler = serverless(app);
