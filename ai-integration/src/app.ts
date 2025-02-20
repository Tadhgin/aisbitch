import dotenv from 'dotenv';
dotenv.config();
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN); // Log the GitHub token

import express from 'express';
import aiRoutes from './routes/aiRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the AI API service!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});