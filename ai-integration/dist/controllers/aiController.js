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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const aiService_1 = require("../services/aiService");
const gitHubService_1 = require("../services/gitHubService");
class AIController {
    constructor() {
        this.getAIResponse = (req, res) => {
            try {
                const { input } = req.body;
                if (!input) {
                    res.status(400).json({ error: 'Missing input data' });
                    return; // 🔥 Ensure function exits after sending response
                }
                const response = this.aiService.getResponse(input);
                res.json({ response });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                res.status(500).json({ error: errorMessage });
            }
        };
        this.handleGitHubRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body || !req.body.action) {
                    res.status(400).json({ error: 'Invalid request payload' });
                    return; // 🔥 Ensure function exits after sending response
                }
                const result = yield this.gitHubService.interactWithGitHub(req.body);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                res.status(500).json({ error: errorMessage });
            }
        });
        this.aiService = new aiService_1.AIService();
        this.gitHubService = new gitHubService_1.GitHubService();
    }
}
exports.AIController = AIController;
