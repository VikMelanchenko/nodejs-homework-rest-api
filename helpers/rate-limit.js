const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { HTTPCode } = require('./helpers');

const createAccLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes //кол-ао милисекудн за один час - ограничение регистраций
  max: 100,
  handler: (_req, res, _next) => {
    return res.status(HTTPCode.BAD_REQUEST).json({
      status: 'error',
      code: HTTPCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many requests, please try again later',
    });
  },
});

module.exports = { createAccLimiter };
