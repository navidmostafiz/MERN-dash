import React, { Component } from 'react';

class DetailUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {firstName: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.firstName != nextProps.user.firstName) {
      this.setState({
        firstName: nextProps.user.firstName
      });
    }
  }

  handleChange(event) {
    console.log("Handler: event.target.firstName  " + event.target.value );
    this.setState({firstName: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.firstName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.firstName} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default DetailUserComponent;