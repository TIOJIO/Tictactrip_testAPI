"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/justifyRoute.ts
const express_1 = require("express");
const justifyController_1 = require("../controllers/justifyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rateLimitMiddleware_1 = require("../middlewares/rateLimitMiddleware");
const router = (0, express_1.Router)();
router.post('/justify', (req, res, next) => { (0, authMiddleware_1.authMiddleware)(req, res, next), (0, rateLimitMiddleware_1.rateLimitMiddleware)(req, res, next), (0, justifyController_1.justifyText)(req, res, next); });
exports.default = router;
