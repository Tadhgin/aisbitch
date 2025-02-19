import express, { Request, Response } from 'express';
import aiRoutes from './routes/aiRoutes';

const app = express();
const port = process.env.PORT || 3000; // Uses PORT from .env or defaults to 3000

app.use(express.json());
app.use('/api', aiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to the AI API service!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

export default app; // ✅ Exporting for testing purposes
