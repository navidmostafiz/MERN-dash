import axios from 'axios';

export function updateUser(user_id, user, callback) {
  return function (dispatch) {
    dispatch({
      type: 'PUT_USER_REQUEST',
    });
    
    axios.put('users/' + user_id, user)
      .then((response) => {
        
        dispatch({
          type: 'PUT_USER_SUCCESS',
          payload: response.data,
        });
        if (typeof callback === 'function') {
          callback(null, response.data);
        }
      })
      .catch((err) => {
        
        dispatch({
          type: 'PUT_USER_FAILURE',
          payload: err.response.data,
        });
        if (typeof callback === 'function') {
          callback(err.response.data);
        }
      });
  };
}
