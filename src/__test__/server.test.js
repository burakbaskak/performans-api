const app = require('../index');
const supertest = require('supertest');
const mongoose = require('mongoose');
import mongoModels from '../models';

afterEach(async () => {
  await mongoModels.models.Analytic.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

test('GET /analytics', async () => {
  const analytic = await mongoModels.models.Analytic.create({
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
