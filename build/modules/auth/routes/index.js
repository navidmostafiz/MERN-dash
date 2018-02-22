'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../controllers/index.js');

var AuthController = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRoutes = _express2.default.Router();

authRoutes.use(AuthController.createAdminUserIfNotExist);

authRoutes.route('/').post(AuthController.authenticateUser);

authRoutes.route('/register').post(AuthController.registerUser);

exports.default = authRoutes;
//# sourceMappingURL=index.js.map