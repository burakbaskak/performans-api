const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  // const start = req.query.start;
  // const end = req.query.end || start;
  // const startDate = new Date(start);
  // const endDate = new Date(new Date(end).getTime() - 30 * 60000);

  const startDate = new Date();
  const endDate = new Date(
    new Date(startDate).getTime() - 30 * 60000,
  );
  const analytic = await req.context.models.Analytic.find({
    created_on: {
      $gte: endDate,
      $lte: startDate,
    },
  });
  return res.send(analytic);
});

router.post('/', async (req, res) => {
  const now = new Date();
  const data = JSON.parse(req.body.data);
  data.analytics.map((item) => {
    item.createText = `${now.getHours()}:${now.getMinutes()}`;
    item.created_on = new Date();
  });
  data.resources.map((item) => {
    item.createText = `${now.getHours()}:${now.getMinutes()}`;
    item.created_on = new Date();
  });
  const message = await req.context.models.Analytic.insertMany(
    data.analytics,
  );
  const resources =
    await req.context.models.ResourceAnalytic.insertMany(
      data.resources,
    );
  return res.send(message);
});

module.exports = router;
