import React, { Component } from 'react';
import moment from 'moment';
import toastr from 'toastr';

class UserComponent extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <div className='table-responsive'>
            <table className='table table-bordered table-striped table-hover'>
              <thead>
                <tr>
                  <td>SL</td>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Email Address</td>
                  <td>Status</td>
                  <td>Create Date</td>
                  <td>Update Date</td>
                  <td>Action</td>
                </tr>
              </thead> return (
              <div className='row'>
                <div className='col-xs-12 text-center'>
                  <div className='table-responsive'>
                    <table className='table table-bordered table-striped table-hover'>
                      <thead>
                        <tr>
                          <td>SL</td>
                          <td>First Name</td>
                          <td>Last Name</td>
                          <td>Email Address</td>
                          <td>Status</td>
                          <td>Create Date</td>
                          <td>Update Date</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderAllUser()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <tbody>
                {this.renderAllUser()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderAllUser() {
    if (this.props.allUser.length) {
      return this.props.allUser.map(function (user, index) {
        return (
          <tr key={user._id}>
            <td>
              <a href={"./users/" + user._id}>{index + 1}</a>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.emailAddress}</td>
            <td>{user.status}</td>
            <td>{moment(user.createdAt).format('MMM Do YY')}</td>
            <td>{moment(user.updatedAt).format('MMM Do YY')}</td>
            <td>
              <a href={"./users/" + user._id}>Edit</a>
            </td>
          </tr>
        );
      });
    } else {
      return null;
    }
  }

}

export default UserComponent;
