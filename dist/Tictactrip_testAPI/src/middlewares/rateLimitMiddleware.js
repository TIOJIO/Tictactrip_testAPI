"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 80000,
    duration: 24 * 60 * 60, // 1 day
});
const rateLimitMiddleware = (req, res, next) => {
    if (req.user && req.user.email) {
        rateLimiter.consume(req.user.email)
            .then(() => {
            next();
        })
            .catch(() => {
            res.status(402).send('Payment Required: daily word limit exceeded');
        });
    }
    else {
        res.status(401).send('Unauthorized: User not authenticated');
    }
};
exports.rateLimitMiddleware = rateLimitMiddleware;
