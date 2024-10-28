"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (req, res, next) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        console.log('Token:' + token);
        return res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
};
exports.generateToken = generateToken;
