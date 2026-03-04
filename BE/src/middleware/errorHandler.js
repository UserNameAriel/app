function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  const statusCode = err.statusCode || 500;
  const error = statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR';

  return res.status(statusCode).json({
    error,
    message: err.message || 'An unexpected error occurred',
  });
}

module.exports = { errorHandler };
