const express = require('express');
const router = express.Router();
const { reg, login, logout } = require('../../../../controllers/users');
const guard = require('../../../../helpers/guard');
const upload = require('../../../../helpers/upload');
const validate = require('../validation');
const { createAccLimiter } = require('../../../../helpers/rate-limit');

router.post('/registration', createAccLimiter, validate.reg, reg);
router.post('/login', validate.login, login);
router.post('/logout', guard, logout);
router.patch('/avatars');

module.exports = router;
