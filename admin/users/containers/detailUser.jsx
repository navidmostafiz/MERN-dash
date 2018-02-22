import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DetailUserComponent from '../components/detailUser.jsx';

import { getUser } from '../actions/getUser.js';
import { updateUser } from '../actions/updateUser.js';
 

class DetailUserContainer extends Component {
  componentWillMount() {
    this.props.getUser(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    // this.props.updateUser(nextProps);
  }

  render() {
    console.log("\t\t\t\t***************************passing props to component = " + this.props.user.firstName);
    return (
      <DetailUserComponent
        user={this.props.user}
        updateUser={this.props.updateUser} />
    );
  }
}

// Get apps store and pass it as props to UserContainer
//  > whenever store changes, the UserContainer will automatically re-render
// "store.User" is set in reducers.js
function mapStateToProps(store) {
  console.log("\t\t\t\t ***************************************store = " + store.user.firstName);
  return {
    user: store.user,
  };
}

// Get actions and pass them as props to to UserContainer
//  > now UserContainer has this.props.getUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser,
    updateUser: updateUser,
  }, dispatch);
}

// We don't want to return the plain UserContainer (component) anymore,
// we want to return the smart Container
//  > UserContainer is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(DetailUserContainer);
