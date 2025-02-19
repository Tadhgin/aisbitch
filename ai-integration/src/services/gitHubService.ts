import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

if (!GITHUB_TOKEN) {
  console.error('❌ GitHub Token is missing. GitHub integration will not work.');
}

/**
 * Defines the expected GitHub API response structure.
 */
interface GitHubFileResponse {
  sha: string;
}

/**
 * Handles GitHub interactions such as committing files.
 */
export class GitHubService {
  /**
   * Interacts with GitHub API
   * @param data Contains action, repo, filePath, and content for commit.
   * @returns GitHub API response.
   */
  public async interactWithGitHub(data: { action: string; repo: string; filePath: string; content: string }): Promise<any> {
    if (!GITHUB_TOKEN) {
      throw new Error('GitHub token is missing. Please set the GITHUB_TOKEN environment variable.');
    }

    const { action, repo, filePath, content } = data;

    if (!repo || !filePath || !content) {
      console.error('❌ Missing required fields: repo, filePath, or content.');
      throw new Error('Missing required fields: repo, filePath, and content.');
    }

    if (action !== 'commit') {
      throw new Error('Unsupported action. Only "commit" is currently supported.');
    }

    const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    console.log(`🚀 Sending commit to GitHub: ${url}`);

    try {
      // Fetch the current file SHA (GitHub requires it for updating files)
      let sha: string | undefined = undefined;

      try {
        const fileResponse = await axios.get<GitHubFileResponse>(url, {
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });
        sha = fileResponse.data.sha;
      } catch (fileError: any) {
        if (fileError.response?.status !== 404) {
          throw new Error(`Error fetching file info: ${fileError.response?.data?.message || fileError.message}`);
        }
      }

      const response = await axios.put(
        url,
        {
          message: 'AI Commit',
          content: Buffer.from(content).toString('base64'),
          branch: 'main',
          sha // Only include `sha` if the file exists
        },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }
      );

      console.log('✅ GitHub Commit Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ GitHub API Error:', error.message);
      throw new Error(`GitHub interaction failed: ${error.message}`);
    }
  }
}
