const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const { httpCode } = require('../model/helpers');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (_req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(httpCode.CONFLICT).json({
        status: 'error',
        code: httpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email is already use',
      });
    }
    const newUser = await Users.create(req, body);
    return res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (rec, res, next) => {};
const logout = async (rec, res, next) => {};

module.exports = {
  reg,
  login,
  logout,
};
