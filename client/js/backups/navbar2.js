"use strict";
var React = require('react');
// import { Link } from 'react-router';
// import { Login } from './login.js';
// import { Signup } from './signup.js';
// import { Dashboard } from './dashboard.js';
// import { History } from 'react-router';
// var LocalStorageMixin = require('react-localstorage');

var Navbar = exports.Navbar = React.createClass({
  // displayName: 'Navbar',
  // mixins: [ History, LocalStorageMixin ],
  updateInput: function (e) {
    this.props.updateInput(e.target.value);
  },

  clearInput: function (e) {
    this.props.updateInput("");
  },

  handleSearchSubmit: function (e) {
    e.preventDefault();
    this.props.handleSearchSubmit();
  },

  componentDidMount: function () {
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        //ready: function() { alert('Ready'); }, // Callback for Modal open
        //complete: function() { alert('Closed'); } // Callback for Modal close
      }
    );
  },

  render: function () {
    //console.log("Navbar/render/this.props.loggedIn:",this.props.loggedIn);
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper grey lighten-5">
              <a href="/" className="brand-logo black-text">Charity Tree</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse black-text"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                {/*Search Bar*/}
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                    <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>
                {/*Login/Signup*/}
                <li>
                  {this.props.loggedIn ? (
                    <a className="waves-effect waves-light black-text" href="/logout">Logout</a>
                  ) : (
                    <a className="waves-effect waves-light black-text" href="/login">Login/Signup</a>
                  )}
                </li>
                {/*Browse Categories*/}
                <li>
                  <a className="waves-effect waves-light black-text" href="/browse">Browse Categories</a>
                </li>
              </ul>

              {/*Side Navigation*/}
              <ul className="side-nav" id="mobile-demo">
                {/*Search Bar*/}
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                      <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>
                {/*Login/Signup*/}
                <li>
                  {this.props.loggedIn ? (
                    <a className="waves-effect waves-light black-text" href="/logout">Logout</a>
                  ) : (
                    <a className="waves-effect waves-light black-text" href="/login">Login/Signup</a>
                  )}
                </li>
                {/*Browse Categories*/}
                <li>
                  <a className="waves-effect waves-light" href="/browse">Browse Categories</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
});

// render(<Navbar />, document.getElementById('navbar'));
