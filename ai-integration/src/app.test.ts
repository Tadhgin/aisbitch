import request from 'supertest';
import express from 'express';
import aiRoutes from './routes/aiRoutes';

const app = express();
app.use(express.json());
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the AI API service!');
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the AI API service!');
  });
});

describe('POST /api/ai-response', () => {
  it('should return AI response', async () => {
    const res = await request(app)
      .post('/api/ai-response')
      .send({ input: 'Hello AI' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.response).toBe('AI response to: Hello AI');
  });
});