"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
const axios_1 = __importDefault(require("axios"));
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; // Ensure it's set
if (!GITHUB_TOKEN) {
    console.warn('⚠️ Warning: GitHub Token is missing. GitHub features will not work.');
}
class GitHubService {
    /**
     * Handles GitHub interactions such as committing files.
     * @param data Contains action, repo, filePath, and content for commit.
     * @returns GitHub API response.
     */
    interactWithGitHub(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { action, repo, filePath, content } = data;
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
                const response = yield axios_1.default.put(url, {
                    message: 'AI Commit',
                    content: Buffer.from(content).toString('base64'),
                    branch: 'main',
                }, {
                    headers: {
                        Authorization: `Bearer ${GITHUB_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                });
                console.log('✅ GitHub Commit Response:', response.data);
                return response.data;
            }
            catch (error) {
                if (error.response) {
                    console.error('❌ GitHub API Error:', JSON.stringify(error.response.data, null, 2));
                    throw new Error(`GitHub interaction failed: ${JSON.stringify(error.response.data)}`);
                }
                else {
                    console.error('❌ Unexpected Error:', error.message);
                    throw new Error(`Unexpected error: ${error.message}`);
                }
            }
        });
    }
}
exports.GitHubService = GitHubService;
