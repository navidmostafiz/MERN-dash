import { combineReducers } from 'redux';

import { authReducer } from './auth/reducers/auth.js';
import { allUserReducer } from './users/reducers/allUser.js';
import { userReducer } from './users/reducers/user.js';
import { updateUserReducer } from './users/reducers/updateUser.js';

const reducers = combineReducers({
  auth: authReducer,
  allUser: allUserReducer,
  user: userReducer,
  updateUser: updateUserReducer,
});

export default reducers;
