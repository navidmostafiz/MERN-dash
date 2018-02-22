import React from 'react';
import { Route, IndexRoute } from 'react-router';

import UserContainer from '../containers/user.jsx';
import detailUserContainer from '../containers/detailUser.jsx';

export default function () {
  return (
    <Route path='users'>
      <IndexRoute component={UserContainer} />
      <Route path=':userId' component={detailUserContainer} />
    </Route>
  );
};
