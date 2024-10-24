import { Router } from 'express';
import { generateToken } from '../controllers/authController'; 

const router = Router();

router.post('/token', (req, res, next) => {generateToken(req, res, next)}
);

export default router;
