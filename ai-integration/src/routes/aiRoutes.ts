import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();
const aiController = new AIController();

router.post('/ai-response', aiController.getAIResponse);

export default router;