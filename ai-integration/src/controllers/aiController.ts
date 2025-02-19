import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { GitHubService } from '../services/gitHubService';

export class AIController {
  private aiService: AIService;
  private gitHubService: GitHubService;

  constructor() {
    this.aiService = new AIService();
    this.gitHubService = new GitHubService();
  }

  public getAIResponse = (req: Request, res: Response): void => {
    try {
      const { input } = req.body;
      if (!input) {
        res.status(400).json({ error: 'Missing input data' });
        return;  // 🔥 Ensure function exits after sending response
      }
      const response = this.aiService.getResponse(input);
      res.json({ response });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  };

  public handleGitHubRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body || !req.body.action) {
        res.status(400).json({ error: 'Invalid request payload' });
        return;  // 🔥 Ensure function exits after sending response
      }

      const result = await this.gitHubService.interactWithGitHub(req.body);
      res.json(result);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  };
}
