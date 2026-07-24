export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(', '),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate field value' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server error',
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};
