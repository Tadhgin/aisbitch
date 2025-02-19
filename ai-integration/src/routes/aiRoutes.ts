import express from 'express';
import { AIController } from '../controllers/aiController';

const router = express.Router();
const aiController = new AIController();

router.post('/ai-response', aiController.getAIResponse);
router.post('/github', aiController.handleGitHubRequest); // ✅ FIXED ROUTE

export default router;
