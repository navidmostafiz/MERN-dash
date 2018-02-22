'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _config2.default.get('JWT.SECRET'), function (err, decoded) {
      if (err) {
        console.error('verifyToken...err: ', err);
        err.status = 401;
        return next(err);
      }

      console.log('verifyToken...', decoded._doc);

      // if everything is good, save to request for use in other routes
      req.authUser = decoded._doc;
      next();
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error('No token provided');
    err.status = 401;
    return next(err);
  }
}
//# sourceMappingURL=verifyToken.js.map