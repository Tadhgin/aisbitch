export class AIService {
  /**
   * Generates an AI response based on input.
   * @param input The user's input text.
   * @returns AI-generated response.
   */
  async getResponse(input: string): Promise<string> {
    return `AI response to: ${input}`;
  }
}
