require('dotenv/config');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const models = require('./models');
const routes = require('./routes');

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
    models: models.models,
  };
  next();
});

// * Routes * //

app.use('/analytics', routes.analytic);
app.use('/resource-analytics', routes.resourceAnalytic);

app.get('/', (req, res) => {
  res.send(
    '<h1 style="text-align:center;margin-top:10%">Trendyol Case - Backend App</h1>',
  );
});

// * Start * //
models.connectDb().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

module.exports = app;
