import User from '../models/index.js';

/**
 * get users
 */
export function getAllUser(req, res, next) {
  console.log('server.getAllUser');
  User.find().sort({
    createdAt: -1,
  }).exec((err, users) => {
    if (err) return next(err);
    return res.status(200).json({
      success: true,
      message: 'Get all user',
      data: users,
    });
  });
}

/**
 * get user
 */
export function getUser(req, res, next) {
  console.log("\t\t\treq.params._id = " + req.params._id);
  User.findById(req.params._id)
    .exec((err, user) => {
      if (err) return next(err);
      console.log('\t\t\t\t\t\t\tGET/getUser: ' + user.firstName);
      console.log('\t\t\t\t\t\t\tGET/getUser: ' + user.lastName);
      return res.status(200).json({
        success: true,
        message: 'Get user',
        data: user,
      });
    });
}


/**
 * add user
 */
export function addUser(req, res, next) {
  console.log('addUser(req.body): ', req.body);
  const newUser = new User();
  Object.assign(newUser, req.body, {
    password: newUser.generateHash(req.body.password),
  });
  console.log('addUser(newUser): ', newUser);
  newUser.save(function (err, user) {
    if (err) return next(err);

    return res.status(201).json({
      success: true,
      message: 'Created user!',
      data: user,
    });
  });
}


/**
 * update user
 */
export function updateUser(req, res, next) {
  console.log("*********************************************UpdateUser" + req.body.firstName);
  User.findById(req.params._id, function (err, user) {
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
