// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${status}] ${message}\n`, err.stack);
  }

  res.status(status).json({ success: false, error: message });
};
