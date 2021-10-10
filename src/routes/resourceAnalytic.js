import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const message = await req.context.models.ResourceAnalytic.create({
    name: req.body.name,
    duration: req.body.duration,
    initiatorType: req.body.initiatorType,
    created_on: new Date(),
  });

  return res.send(message);
});

export default router;
