import { AIModel } from '../models/aiModel';

export class AIService {
  private aiModel: AIModel;

  constructor() {
    this.aiModel = new AIModel();
  }

  getResponse(input: string): string {
    return this.aiModel.generateResponse(input);
  }
}