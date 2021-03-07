const passport = require('passport');
require('../config/passport');
const HTTPcode = require('./helpers');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (!user || error) {
      return res.status(HTTPcode.FORBIDDEN).json({
        status: 'error',
        code: HTTPcode.FORBIDDEN,
        data: 'Forbidden',
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = {
  guard,
};
