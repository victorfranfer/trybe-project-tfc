import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  if (error.message === 'jwt erro') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  return res.status(500).json({ message: error.message });
};

export default errorMiddleware;
