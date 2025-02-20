import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Load from environment variables

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

/**
 * Handles GitHub interactions such as committing files.
 */
export class GitHubService {
  public async interactWithGitHub(data: any): Promise<any> {
    console.log('GITHUB_TOKEN:', GITHUB_TOKEN); // Log the GitHub token
    console.log('GitHub interaction data:', data); // Log the interaction data

    const { action, repo, filePath, content } = data;

    if (!GITHUB_TOKEN) {
      console.error('❌ Missing GitHub Token');
      throw new Error('Missing GitHub token. Please set the GITHUB_TOKEN environment variable.');
    }

    if (!repo || !filePath || !content) {
      console.error('❌ Missing required fields');
      throw new Error('Missing required fields: repo, filePath, and content.');
    }

    if (action === 'commit') {
      const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
      console.log(`🚀 Sending commit to GitHub: ${url}`);

      try {
        const response = await axios.put(
          url,
          {
            message: 'AI Commit',
            content: Buffer.from(content).toString('base64'),
            branch: 'main'
          },
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json'
            }
          }
        );

        console.log('✅ GitHub Commit Response:', response.data);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          console.error('❌ GitHub API Error:', JSON.stringify(error.response.data, null, 2));
          throw new Error(`GitHub interaction failed: ${JSON.stringify(error.response.data)}`);
        } else {
          console.error('❌ Unexpected Error:', error.message);
          throw new Error(`Unexpected error: ${error.message}`);
        }
      }
    }

    throw new Error('Unsupported action. Only "commit" is currently supported.');
  }
}