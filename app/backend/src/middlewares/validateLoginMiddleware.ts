import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandlerUtil';
import emailRegex from '../utils/regexUtils';

const validateLoginMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(400, 'All fields must be filled'));
  }

  if (!emailRegex.test(email) || password.length < 6) {
    return next(new ErrorHandler(401, 'Incorrect email or password'));
  }
  next();
};

export default validateLoginMiddleware;
