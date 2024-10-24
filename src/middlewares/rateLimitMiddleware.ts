import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';


interface CustomRequest extends Request {
    user?: {
      email: string;
    };
  }
  
const rateLimiter = new RateLimiterMemory({
  points: 80000,
  duration: 24 * 60 * 60, // 1 day
});

export const rateLimitMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {    

      if (req.user && req.user.email) {
        rateLimiter.consume(req.user.email)
          .then(() => {
            next();
          })
          .catch(() => {
              res.status(402).send('Payment Required: daily word limit exceeded');
          });
      } else {
        res.status(401).send('Unauthorized: User not authenticated');
      }
    

    
  };
