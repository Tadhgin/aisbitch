import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables from .env

import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; // Ensure token is defined

if (!GITHUB_TOKEN) {
  console.warn('⚠️ Warning: GitHub Token is missing. GitHub features will not work.');
}

export class GitHubService {
  /**
   * Handles GitHub interactions such as committing files.
   * @param data Contains action, repo, filePath, and content for commit.
   * @returns GitHub API response.
   */
  public async interactWithGitHub(data: {
    action: string;
    repo: string;
    filePath: string;
    content: string;
  }): Promise<any> {
    const { action, repo, filePath, content } = data;

    // ✅ Basic Validation
    if (!GITHUB_TOKEN) {
      console.error('❌ Missing GitHub Token');
      throw new Error('Missing GitHub token. Please set the GITHUB_TOKEN environment variable.');
    }

    if (!repo || !filePath || !content) {
      console.error('❌ Missing required fields');
      throw new Error('Missing required fields: repo, filePath, and content.');
    }

    if (action !== 'commit') {
      throw new Error('Unsupported action. Only "commit" is currently supported.');
    }

    const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    console.log(`🚀 Sending commit to GitHub: ${url}`);

    try {
      const response = await axios.put(
        url,
        {
          message: 'AI Commit',
          content: Buffer.from(content).toString('base64'),
          branch: 'main',
        },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`, // ✅ Fixed token format
            Accept: 'application/vnd.github.v3+json',
          },
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
}
