const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // 404 = Not Found
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 500 = Internal Server Error
  let message = err.message;

  if (err.message === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  let stack = process.env.NODE_ENV === 'production' ? null : err.stack;
  res.status(statusCode);
  res.json({
    message,
    stack
  });
}

export { notFound, errorHandler };