import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import CoreLayout from './core/layouts/index.jsx';
import NotFoundComponent from './core/components/notFound.jsx';

import authRoute from './auth/routes/index.jsx';
import dashboardRoute from './dashboard/routes/index.jsx';
import userRoute from './users/routes/userRoute.jsx';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='admin' component={CoreLayout}>
          <IndexRedirect to='dashboard' />
          {authRoute()}
          {dashboardRoute()}
          {userRoute()}
          <Route path='*' component={NotFoundComponent} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
