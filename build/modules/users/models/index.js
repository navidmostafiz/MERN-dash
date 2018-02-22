'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a userSchema
var userSchema = exports.userSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.']
  },
  emailAddress: {
    type: String,
    required: [true, 'Email Address is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  role: {
    type: String,
    enum: ['Subscriber', 'Administrator'],
    default: 'Subscriber'
  },
  createdAt: Date,
  updatedAt: Date
}, { versionKey: false });

/*
 * userSchema middlewares
 */

// on every save, add the date
userSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

/*
 * userSchema methods
 */

// generating a hash
userSchema.methods.generateHash = function (password) {
  return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10));
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return _bcryptNodejs2.default.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
var User = _mongoose2.default.model('User', userSchema);

// make this available to our users in our Node applications
exports.default = User;
//# sourceMappingURL=index.js.map