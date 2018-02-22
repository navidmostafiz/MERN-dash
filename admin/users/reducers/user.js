/*
 * This reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 */

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return state;
    case 'FETCH_USER_SUCCESS':
      return action.payload.data;
    case 'FETCH_USER_FAILURE':
      return state;
    default:
      return state;
  }
};
