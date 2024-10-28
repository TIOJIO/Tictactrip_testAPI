"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoute.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/token', (req, res, next) => { (0, authController_1.generateToken)(req, res, next); });
exports.default = router;
