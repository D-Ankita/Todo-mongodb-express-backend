import { Request, Response, NextFunction } from 'express';

const sendErrorResponse = (error:any, req:Request, res:Response, next: NextFunction) => {
    const { statusCode, message } = error;
    res.status(statusCode).json({
      message: message,
    });
  };

  module.exports = sendErrorResponse