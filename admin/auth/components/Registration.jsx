import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import toastr from 'toastr';

class RegistrationComponent extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <h1 className='title'>NYCL registration</h1>
        </div>
        <div className='col-xs-4 col-xs-offset-4'>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                ref='firstName'
                type='text'
                className='form-control'
                placeholder='First Name' />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                ref='lastName'
                type='text'
                className='form-control'
                placeholder='Last Name' />
            </div>
            <div className='form-group'>
              <label htmlFor='emailAddress'>Email address</label>
              <input
                ref='emailAddress'
                type='email'
                className='form-control'
                placeholder='Email Address' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                ref='password'
                type='password'
                className='form-control'
                placeholder='Password' />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                ref='confirmPassword'
                type='password'
                className='form-control'
                placeholder='Confirm Password' />
            </div>
            <div className='col-xs-offset-3'>
              <button
                type='submit'
                className='btn btn-block btn-primary'>
                Register
              </button>
            </div>
            <div className='text-center'>
              <p><br/>- OR -<br/></p>
              <Link
                to='/admin/auth/login'
                className='btn btn-block btn-default'>
                I already have a account
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    const _this = this;
    event.preventDefault();

    let firstName = ReactDOM.findDOMNode(_this.refs.firstName).value.trim();
    let lastName = ReactDOM.findDOMNode(_this.refs.lastName).value.trim();
    let emailAddress = ReactDOM.findDOMNode(_this.refs.emailAddress).value.trim();
    let password = ReactDOM.findDOMNode(_this.refs.password).value.trim();
    let confirmPassword = ReactDOM.findDOMNode(_this.refs.confirmPassword).value.trim();

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

    if (password.length < 1) {
      toastr.warning('Password is required.', 'NYCL Alert!');
      return false;
    }

    if (password !== confirmPassword) {
      toastr.warning('Confirm Password is not match.', 'NYCL Alert!');
      return false;
    }

    this.props.registerUser({
      firstName, lastName, emailAddress, password,
    }, function (err, res) {
      if (err) {
        console.error('registerUser: ', err);
        toastr.error(err.message, 'MERNjs');
      } else {
        console.log('registerUser: ', res);
        toastr.success(res.message, 'MERNjs');
        browserHistory.push('/admin/auth');
      }
    });
  }
}

export default RegistrationComponent;
