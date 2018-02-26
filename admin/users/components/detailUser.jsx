import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import toastr from 'toastr';
import { Link, browserHistory } from 'react-router';

class DetailUserComponent extends Component {
  componentWillReceiveProps(nextProps) {
    //when component recive props(first time and also each time container changes prop value)
    //we check if state was set to props or props value has changed and then set/update state values
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

    //we check if role is administrator and do some logical works.
    if (this.state.role != nextProps.user.role) {
      this.setState({
        role: nextProps.user.role
      });
    }

    //updating state on change event for checkbox.
    if (this.state.status != nextProps.user.status) {
      this.setState({
        status: nextProps.user.status,
        isChecked: nextProps.user.status == "Active" ? false : true //Acitve means not disabled/so set to false
      });
    }
  }

  //constructor takes props passed in from container.
  constructor(props) {
    super(props); //we pass props form container to super class React.Component also.
    //console.log("DetailUserComponent - constructor");
    //we define the state fields with null and assign props to them later on.
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      role: '',
      status: '',
      isChecked: false
    }

    //binding this to handler for changes to state fields
    this.firstName_HandleChange = this.firstName_HandleChange.bind(this);
    this.lastName_HandleChange = this.lastName_HandleChange.bind(this);
    this.emailAddress_HandleChange = this.emailAddress_HandleChange.bind(this);
    this.status_HandleChange = this.status_HandleChange.bind(this);

    //binding this to handler for final form submission
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Handler for 
  firstName_HandleChange(event) {
    console.log("Handler: event.target.value  " + event.target.value);
    this.setState({ firstName: event.target.value });
  }

  lastName_HandleChange(event) {
    console.log("Handler: event.target.value  " + event.target.value);
    this.setState({ lastName: event.target.value });
  }

  emailAddress_HandleChange(event) {
    console.log("Handler: event.target.value  " + event.target.value);
    this.setState({ emailAddress: event.target.value });
  }

  status_HandleChange(event) {
    console.log("Handler: event.target.value  " + event.target.value);
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      isChecked: value
    });
  }


  handleSubmit(event) {
    console.log('handleSubmit');

     //prevents default action saved by browser, only allows triggering handler if a fresh submission event has taken place, see also: event.stopPropagation()
    event.preventDefault();

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
    //we call this component props action>container action>Action action>dispatcher with type>listend by reducer as per type, binds back store state
    this.props.updateUser(this.props.user._id, data, function (err, res) {
      if (err) {
        console.error('updateUser: ', err);
        toastr.error(err.message, 'MERNjs');
      } else {
        console.log('updateUser: ', res);
        toastr.success(res.message, 'MERNjs');
        /*browserHistory instance directly to call the history api methods.
        router will listen to this and redirect accordingly. but router must be cconfigured to listen to browser history instance.
        we have different types of history: browser history, hash history, memory history, etc
        */
        browserHistory.push('/admin/users'); //redirect to user page after post submission method was called
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
