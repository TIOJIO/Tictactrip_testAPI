"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const justifyRoutes_1 = __importDefault(require("./routes/justifyRoutes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
(0, swagger_1.setupSwagger)(app);
app.use(body_parser_1.default.text({ type: 'text/plain' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', authRoutes_1.default);
app.use('/api', justifyRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
