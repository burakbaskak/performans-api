const app = require('../index');
const supertest = require('supertest');

import models from '../models';
import 'regenerator-runtime/runtime';

require('dotenv').config();

afterEach(async () => {
  await models.Analytic.deleteMany({});
});

test('GET /analytics', async () => {
  const analytic = await models.Analytic.create({
    name: 'test',
    duration: 3.1,
    createText: '23.09',
    created_on: new Date(),
  });

  await supertest(app)
    .get('/analytics/')
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(analytic.id);
      expect(response.body[0].name).toBe(analytic.name);
      expect(response.body[0].createText).toBe(analytic.createText);
    });
});

test('POST /analytics', async () => {
  await supertest(app)
    .post('/analytics/')
    .send({
      data: JSON.stringify({
        analytics: [
          { name: 'fcp', duration: 3.14 },
          { name: 'ttfb', duration: 3.14 },
        ],
        resources: [
          {
            name: 'some script',
            initiatorType: 'script',
            duration: 4,
          },
        ],
      }),
    })
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(2);
      // Check data
      expect(response.body[0].name).toBe('fcp');
    });
});
