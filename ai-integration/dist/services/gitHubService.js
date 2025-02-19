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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
if (!GITHUB_TOKEN) {
    console.error('❌ GitHub Token is missing. GitHub integration will not work.');
}
/**
 * Handles GitHub interactions such as committing files.
 */
class GitHubService {
    /**
     * Interacts with GitHub API
     * @param data Contains action, repo, filePath, and content for commit.
     * @returns GitHub API response.
     */
    interactWithGitHub(data) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
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
                let sha = undefined;
                try {
                    const fileResponse = yield axios_1.default.get(url, {
                        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
                    });
                    sha = fileResponse.data.sha;
                }
                catch (fileError) {
                    if (((_a = fileError.response) === null || _a === void 0 ? void 0 : _a.status) !== 404) {
                        throw new Error(`Error fetching file info: ${((_c = (_b = fileError.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || fileError.message}`);
                    }
                }
                const response = yield axios_1.default.put(url, {
                    message: 'AI Commit',
                    content: Buffer.from(content).toString('base64'),
                    branch: 'main',
                    sha // Only include `sha` if the file exists
                }, {
                    headers: {
                        Authorization: `Bearer ${GITHUB_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json'
                    }
                });
                console.log('✅ GitHub Commit Response:', response.data);
                return response.data;
            }
            catch (error) {
                console.error('❌ GitHub API Error:', error.message);
                throw new Error(`GitHub interaction failed: ${error.message}`);
            }
        });
    }
}
exports.GitHubService = GitHubService;
