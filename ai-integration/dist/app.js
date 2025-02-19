"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Uses PORT from .env or defaults to 3000
app.use(express_1.default.json());
app.use('/api', aiRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the AI API service!');
});
// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
exports.default = app; // ✅ Exporting for testing purposes
