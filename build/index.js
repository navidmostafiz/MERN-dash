'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get MONGO_URL from environment or config and connect mongodb throw mongoose.
 */

_mongoose2.default.Promise = global.Promise; /**
                                              * Module dependencies.
                                              */

_mongoose2.default.connect(process.env.MONGO_URL || _config2.default.get('MONGO_URL'));

_mongoose2.default.connection.on('error', function () {
  console.error('Could not connect to MongoDB. Did you forget to run `mongod`?');
});

_mongoose2.default.connection.on('connected', function () {
  console.info('APP MONGODB@' + _mongoose2.default.version + ':', process.env.MONGO_URL || _config2.default.get('MONGO_URL'));
});

_mongoose2.default.connection.on('disconnected', function () {
  console.info('Mongoose disconnected to: ' + _config2.default.get('MONGO_URL'));
});

/**
 * Get PORT from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || _config2.default.get('PORT'));
_app2.default.set('port', port);

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_app2.default);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  (0, _debug2.default)('MERNjs:app')('Listening on ' + bind + ' in ' + _app2.default.get('env') + ' env');
}
//# sourceMappingURL=index.js.map