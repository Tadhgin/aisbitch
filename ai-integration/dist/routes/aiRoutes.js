"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../controllers/aiController");
const router = express_1.default.Router();
const aiController = new aiController_1.AIController();
router.post('/ai-response', aiController.getAIResponse);
router.post('/github', aiController.handleGitHubRequest); // ✅ FIXED ROUTE
exports.default = router;
