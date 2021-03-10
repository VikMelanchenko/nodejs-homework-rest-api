const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const { HTTPCode } = require('./helpers/helpers');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 })); // органичения для сервера, чтобы не положить
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2,
  handler: (req, res, next) => {
    return res.status(HTTPCode.BAD_REQUEST).json({
      status: 'error',
      code: HTTPCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many requests, please try again later',
    });
  },
});

app.use('/api/', apiLimiter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users/auth', usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
