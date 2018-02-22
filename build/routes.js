'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./modules/auth/routes/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./modules/users/routes/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET MERNjs RESTful APIs */
router.get('/', function (req, res, next) {
  res.json({
    message: 'Welcome to MERNjs RESTful APIs.'
  });
});

router.use('/auth', _index2.default);
router.use('/users', _index4.default);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (req.app.get('env') === 'production') {
    res.json({
      message: err.message,
      error: {}
    });
  } else {
    res.json({
      message: err.message,
      error: err
    });
  }
});

exports.default = router;
//# sourceMappingURL=routes.js.map