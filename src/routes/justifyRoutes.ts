import { Router } from 'express';
import { justifyText } from '../controllers/justifyController';
import  {authMiddleware}  from '../middlewares/authMiddleware';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddleware';

const router = Router();
router.post('/justify', (req, res ,next) => {authMiddleware(req, res, next), rateLimitMiddleware(req, res, next), justifyText(req, res, next)});

export default router;
