// src/middleware/asyncHandler.js
// Wraps async route handlers to automatically catch errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
