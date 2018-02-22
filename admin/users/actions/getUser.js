import axios from 'axios';

export function getUser(userId, callback) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_USER_REQUEST',
    });
    axios.get('users/' + userId)
      .then((response) => {
        console.log("\t\t\t\taction response.data.firstName = \n\n");
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          payload: response.data,
        });
        if (typeof callback === 'function') {          
          callback(null, response.data);
        }
      })
      .catch((err) => {
        console.log("\t\t\t\taction error err = " + err +"\n\n");
        dispatch({
          type: 'FETCH_USER_FAILURE',
          payload: err.response.data,
        });
        if (typeof callback === 'function') {          
          callback(err.response.data);
        }
      });
  };
}
