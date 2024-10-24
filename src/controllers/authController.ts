import { Request, Response, NextFunction } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';


export const generateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    console.log('Token:'+token)
    return res.status(200).json({ token });
    
  } catch (error) {
    next(error);  
  }
};
