import { Request, Response } from 'express';
import { AIService } from '../services/aiService';

export class AIController {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  public getAIResponse = (req: Request, res: Response): void => {
    const { input } = req.body;
    const response = this.aiService.getResponse(input);
    res.json({ response });
  };
}