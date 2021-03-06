const express = require('express');
const router = express.Router();
const { reg, login, logout } = require('../../../../controllers/users');
const validate = require('../validation');
const guard = require('../../../../helpers/guard');

router.post('/registration', reg);
router.post('/login', login);
router.post('/logout', guard, logout);

module.exports = router;
