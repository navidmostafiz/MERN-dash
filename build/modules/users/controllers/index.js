'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUser = getAllUser;
exports.getUser = getUser;
exports.addUser = addUser;
exports.updateUser = updateUser;

var _index = require('../models/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get users
 */
function getAllUser(req, res, next) {
  console.log('server.getAllUser');
  _index2.default.find().sort({
    createdAt: -1
  }).exec(function (err, users) {
    if (err) return next(err);
    return res.status(200).json({
      success: true,
      message: 'Get all user',
      data: users
    });
  });
}

/**
 * get user
 */
function getUser(req, res, next) {
  console.log("\t\t\treq.params._id = " + req.params._id);
  _index2.default.findById(req.params._id).exec(function (err, user) {
    if (err) return next(err);
    console.log('\t\t\t\t\t\t\tGET/getUser: ' + user.firstName);
    console.log('\t\t\t\t\t\t\tGET/getUser: ' + user.lastName);
    return res.status(200).json({
      success: true,
      message: 'Get user',
      data: user
    });
  });
}

/**
 * add user
 */
function addUser(req, res, next) {
  console.log('addUser(req.body): ', req.body);
  var newUser = new _index2.default();
  Object.assign(newUser, req.body, {
    password: newUser.generateHash(req.body.password)
  });
  console.log('addUser(newUser): ', newUser);
  newUser.save(function (err, user) {
    if (err) return next(err);

    return res.status(201).json({
      success: true,
      message: 'Created user!',
      data: user
    });
  });
}

/**
 * update user
 */
function updateUser(req, res, next) {
  console.log("*********************************************UpdateUser" + req.body.firstName);
  _index2.default.findById(req.params._id, function (err, user) {
    if (err) return next(err);

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.emailAddress = req.body.emailAddress;
    user.status = req.body.status;

    user.save(function (err) {
      if (err) return next(err);

      return res.status(201).json({
        success: true,
        message: 'Updated user!',
        data: user
      });
    });
  });
}

// export function updateUser(req, res, next) {
//   console.log('updateUser(req.body): ', req.body);
//   const newUser = new User();
//   Object.assign(newUser, req.body, {
//     password: newUser.generateHash(req.body.password),
//   });
//   console.log('registerUser(newUser): ', newUser);
//   newUser.save(function (err, user) {
//     if (err) return next(err);

//     return res.status(201).json({
//       success: true,
//       message: 'Registered user!',
//       data: user,
//     });
//   });

// }
//# sourceMappingURL=index.js.map