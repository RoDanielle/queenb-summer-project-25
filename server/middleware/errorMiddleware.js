// Global Error Handling Middleware
const errorMiddleware = (err, req, res, next) => {
  // Set default status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // hide stack in production
  });
};

module.exports = errorMiddleware;
