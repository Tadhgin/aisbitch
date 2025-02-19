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
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is in your .env file
class GitHubService {
    interactWithGitHub(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { action, repo, filePath, content } = data;
                if (action === 'commit') {
                    const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
                    const response = yield axios_1.default.put(url, {
                        message: 'AI Commit',
                        content: Buffer.from(content).toString('base64'),
                        branch: 'main'
                    }, {
                        headers: { Authorization: `token ${GITHUB_TOKEN}` }
                    });
                    return response.data;
                }
                throw new Error('Unsupported action');
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`GitHub interaction failed: ${errorMessage}`);
            }
        });
    }
}
exports.GitHubService = GitHubService;
