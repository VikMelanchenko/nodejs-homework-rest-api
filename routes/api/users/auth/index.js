const express = require('express');
const router = express.Router();
const { reg, login, logout } = require('../../../../controllers/users');
const guard = require('../../../../helpers/guard');
const validate = require('../validation');

router.post('/registration', validate.reg, reg);
router.post('/login', validate.login, login);
router.post('/logout', guard, logout);

module.exports = router;
