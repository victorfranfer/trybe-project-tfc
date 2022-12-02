import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/userInterface';

export const SECRET = process.env.JWT_SECRET as string;

dotenv.config();

export const generateToken = (payload: Omit<IUser, 'password'>): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};
