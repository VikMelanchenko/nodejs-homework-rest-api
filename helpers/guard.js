const passport = require('passport');
require('../config/passport');
const { HTTPCode } = require('./helpers');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if (!user || err || token !== user.token) {
      return res.status(HTTPCode.UNAUTHORIZED).json({
        status: 'error',
        code: HTTPCode.UNAUTHORIZED,
        data: 'Authorized',
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
