const sendErrorResponse = (error, req, res, next) => {
    const { statusCode, message } = error;
    res.status(statusCode).json({
      message: message,
    });
  };

  module.exports = sendErrorResponse