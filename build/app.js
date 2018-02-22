'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('app-module-path/register');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appModulePath = require('app-module-path');

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// view engine setup
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, '../public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
(0, _appModulePath.addPath)(__dirname);

/* use RESTful APIs listing. */
app.use('/api', _routes2.default);

/* use for admin app. */
app.get(['/admin', '/admin/*'], function (req, res) {
  res.render('index', {
    title: 'MERNjs - Admin',
    name: 'description',
    content: 'content',
    stylesheet: app.get('env') === 'production' ? '/dist/admin.bundle.min.css' : '/dist/admin.bundle.css',
    javascript: app.get('env') === 'production' ? '/dist/admin.bundle.min.js' : '/dist/admin.bundle.js'
  });
});

/* use for default app. */
app.get('*', function (req, res) {
  res.redirect('/admin');
});

exports.default = app;
//# sourceMappingURL=app.js.map