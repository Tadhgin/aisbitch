import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is in your .env file

export class GitHubService {
  public async interactWithGitHub(data: { action: string; repo: string; filePath: string; content: string }): Promise<any> {
    try {
      const { action, repo, filePath, content } = data;

      if (action === 'commit') {
        const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

        const response = await axios.put(
          url,
          {
            message: 'AI Commit',
            content: Buffer.from(content).toString('base64'),
            branch: 'main'
          },
          {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
          }
        );

        return response.data;
      }

      throw new Error('Unsupported action');
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`GitHub interaction failed: ${errorMessage}`);
    }
  }
}
