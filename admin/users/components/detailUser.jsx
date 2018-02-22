import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import toastr from 'toastr';
import { Link, browserHistory } from 'react-router';

class DetailUserComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.state.firstName != nextProps.user.firstName) {
      this.setState({
        firstName: nextProps.user.firstName
      });
    }

    if (this.state.lastName != nextProps.user.lastName) {
      this.setState({
        lastName: nextProps.user.lastName
      });
    }

    if (this.state.emailAddress != nextProps.user.emailAddress) {
      this.setState({
        emailAddress: nextProps.user.emailAddress
      });
    }

    if (this.state.role != nextProps.user.role) {
      this.setState({
        role: nextProps.user.role
      });
    }

    if (this.state.status != nextProps.user.status) {
      this.setState({
        status: nextProps.user.status,
        isChecked: nextProps.user.status == "Active" ? false : true //Acitve means not disabled/so set to false
      });
    }
  }

  constructor(props) {
    super(props);
    console.log("DetailUserComponent - constructor");
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      role: '',
      status: '',
      isChecked: false
    }

    //changes to state fields
    this.firstName_HandleChange = this.firstName_HandleChange.bind(this);
    this.lastName_HandleChange = this.lastName_HandleChange.bind(this);
    this.emailAddress_HandleChange = this.emailAddress_HandleChange.bind(this);
    this.status_HandleChange = this.status_HandleChange.bind(this);

    //final form submission
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firstName_HandleChange(event) {
    console.log("Handler: event.target.value  " + event.target.value + '  firstName  ' + this.state.firstName);
    this.setState({ firstName: event.target.value });
  }

  lastName_HandleChange(event) {
    this.setState({ lastName: event.target.value });
    console.log("Handler  " + event.target.value + '  lastName  ' + this.state.lastName);
  }

  emailAddress_HandleChange(event) {
    this.setState({ emailAddress: event.target.value });
    console.log("Handler  " + event.target.value + '  emailAddress  ' + this.state.emailAddress);
  }

  status_HandleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isChecked: value
    });
  }


  handleSubmit(event) {

    event.preventDefault();
    console.log('handleSubmit');

    const _this = this;

    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let emailAddress = this.state.emailAddress;
    let status = this.state.isChecked ? "Inactive" : "Active";

    console.log('values: ' + firstName + '-' + lastName + '-' + emailAddress + '-' + status + '-')

    /*
     * Validation rules
     */
    if (firstName.length < 1) {
      toastr.warning('First Name is required.', 'NYCL Alert!');
      return false;
    }

    if (lastName.length < 1) {
      toastr.warning('Last Name is required.', 'NYCL Alert!');
      return false;
    }

    if (emailAddress.length < 1) {
      toastr.warning('Email Address is required.', 'NYCL Alert!');
      return false;
    }

    const data = { firstName, lastName, emailAddress, status };
    this.props.updateUser(this.props.user._id, data, function (err, res) {
      if (err) {
        console.error('updateUser: ', err);
        toastr.error(err.message, 'MERNjs');
      } else {
        console.log('updateUser: ', res);
        toastr.success(res.message, 'MERNjs');
        browserHistory.push('/admin/users'); //navid
      }
    });
  }

  render() {
    return (<div className='row'>
      <div className='col-md-offset-4 col-xs-2 col-md-2'>

        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" value={this.state.firstName} onChange={this.firstName_HandleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" value={this.state.lastName} onChange={this.lastName_HandleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" className="form-control" value={this.state.emailAddress} onChange={this.emailAddress_HandleChange} />
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={this.state.isChecked}
                onChange={this.status_HandleChange}
                disabled={this.state.role == "Administrator" ?  true : false } /> Disabled?
            </label>
          </div>

          <button type="submit" className="btn btn-default">Save</button>
        </form>

      </div>
    </div>);
  }

}



export default DetailUserComponent;
