const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const { HTTPCode } = require('../model/helpers');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HTTPCode.CONFLICT).json({
        status: 'error',
        code: HTTPCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HTTPCode.CREATED).json({
      status: 'success',
      code: HTTPCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);

    if (!user || !user.validPassword(password)) {
      return res.status(HTTPCode.UNAUTHORIZED).json({
        status: 'error',
        code: HTTPCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong',
      });
    }
    const id = user.id;
    console.log(user);
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' });
    console.log(token);
    await Users.updateToken(id, token);
    return await res.status(HTTPCode.OK).json({
      status: 'success',
      code: HTTPCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    return next(e);
  }
};
const logout = async (rec, res, next) => {};

module.exports = {
  reg,
  login,
  logout,
};
