"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';

import { Link } from 'react-router';

exports.Signup = React.createClass({
  getInitialState: function() {
    return {
      error: false
    }
  },

  showOrgSignupForm: function() {
    return (
      <div className="div-signup-form">
        <form id="signupForm" className="col s12" onSubmit={this.signup}>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="org_name">Organization Name</label>
              <input type="text" id="org_name" name="org_name" ref="org_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" ref="username" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" ref="pwd" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd2">Re-enter Password</label>
              <input type="password" id="pwd2" name="pwd2" ref="pwd2" required />
            </div>
          </div>

          <div className="row">
            <input className="waves-effect waves-light btn blue" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  },

  showDonorSignupForm: function() {
    return (
      <div className="div-signup-form col s12">
        <form id="signupForm" className="col s12" onSubmit={this.signup}>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" ref="first_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" ref="last_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" ref="email" required className="validate" />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" ref="username" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" ref="pwd" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd2">Re-enter Password</label>
              <input type="password" id="pwd2" name="pwd2" ref="pwd2" required />
            </div>
          </div>

          <div className="row">
            <input className="waves-effect waves-light btn blue" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  },

  navigateToDashboard: function () {
    this.props.history.pushState(null, `/dashboard`);
  },

  signup: function(e) {
    e.preventDefault();
    // var formData = new FormData(document.querySelector('#signupForm'))
    // $('#signupForm').submit(function(e) {
    //   console.log("here")
    //   formData = $( this ).serializeArray();
    //   console.log(formData);
    //   e.preventDefault();
    // })
    if (ReactDOM.findDOMNode(this.refs.pwd).value !== ReactDOM.findDOMNode(this.refs.pwd2).value) {
      alert("Passwords didn't match.");
      return;
    }
    var formData = {};
    if (this.props.userType === 'Organization') {
      formData.org_name = ReactDOM.findDOMNode(this.refs.org_name).value;
      formData.username = ReactDOM.findDOMNode(this.refs.username).value;
      formData.pwd = ReactDOM.findDOMNode(this.refs.pwd).value;
      formData.userType = this.props.userType;
    }

    if (this.props.userType === 'Donor') {
      formData.first_name = ReactDOM.findDOMNode(this.refs.first_name).value;
      formData.last_name = ReactDOM.findDOMNode(this.refs.last_name).value;
      formData.email = ReactDOM.findDOMNode(this.refs.email).value;
      formData.username = ReactDOM.findDOMNode(this.refs.username).value;
      formData.pwd = ReactDOM.findDOMNode(this.refs.pwd).value;
      formData.userType = this.props.userType;
    }

    $.ajax({
      type: 'POST',
      url: '/signup_post',
      data: formData,
      success: function(response) {
        console.log(response);
        localStorage.token = response.token;
        this.props.isLoggedIn();
        this.navigateToDashboard(); //navigate to dashboard page
        // window.location.href = "http://127.0.0.1:4000/dashboard"
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });

    // var frm = document.getElementById('signupForm');
    // frm.reset();
    // return false;
  },

  render: function() {
    if (this.props.userType === 'Organization') {
      return this.showOrgSignupForm();
    } else if (this.props.userType === 'Donor') {
      return this.showDonorSignupForm();
    }
  }
});
