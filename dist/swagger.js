"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
// src/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tictactrip API',
            version: '1.0.0',
            description: 'API for text justification',
        },
        servers: [
            {
                url: 'https://tictactrip-26a03a519eb2.herokuapp.com/', // Remplacez par l'URL de votre API déployée sur Heroku
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Chemin des fichiers où vous documenterez vos endpoints
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
