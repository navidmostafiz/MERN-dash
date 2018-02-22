'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdminUserIfNotExist = createAdminUserIfNotExist;
exports.authenticateUser = authenticateUser;
exports.registerUser = registerUser;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../../users/models/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAdminUserIfNotExist(req, res, next) {
  _index2.default.find().exec(function (err, users) {
    if (err) return next(err);
    if (users.length) {
      return next();
    } else {
      var adminUser = new _index2.default();
      Object.assign(adminUser, {
        firstName: 'Administrator',
        lastName: 'User',
        emailAddress: 'admin@mail.com',
        password: adminUser.generateHash('admin'),
        role: 'Administrator'
      });
      adminUser.save(function (err, admin) {
        if (err) return next(err);
        console.log('Create an admin user.');
        return next();
      });
    }
  });
}

function authenticateUser(req, res) {
  // find the user
  _index2.default.findOne({
    emailAddress: req.body.emailAddress
  }, function (err, user) {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      // check if password matches
      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        // if user is found and password is right
        // create a token
        var token = _jsonwebtoken2.default.sign(user, _config2.default.get('JWT.SECRET'), {
          expiresIn: _config2.default.get('JWT.EXPIRES')
        });

        // return the information including token as JSON
        return res.json({
          success: true,
          message: 'Authenticated User!',
          data: { token: token, email: user.emailAddress }
        });
      }
    }
  });
}

function registerUser(req, res, next) {
  console.log('registerUser(req.body): ', req.body);
  var newUser = new _index2.default();
  Object.assign(newUser, req.body, {
    password: newUser.generateHash(req.body.password)
  });
  console.log('registerUser(newUser): ', newUser);
  newUser.save(function (err, user) {
    if (err) return next(err);

    return res.status(201).json({
      success: true,
      message: 'Registered user!',
      data: user
    });
  });
}
//# sourceMappingURL=index.js.map