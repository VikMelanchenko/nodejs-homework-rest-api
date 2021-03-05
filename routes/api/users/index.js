const express = require('express');
const router = express.Router();
const userControllers = require('../../../controllers/users');
const validate = require('./validation');

router.post('/registration', userControllers.reg);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

module.exports = router;
