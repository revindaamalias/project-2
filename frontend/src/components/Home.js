import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "../Home";
import Product from "../Product";
import Cart from "../Cart";
import About from "../About";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

class App extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    return (
      <HashRouter>
        <div>
          <div className="row">
            <div className="col-sm-1">
              <img width="70px" src="/images/mesin2.jpg" />
            </div>
            <div className="col-sm-11">
              <h1 className="title">BOOM WASHER</h1>
            </div>
          </div>
          <br />
          <ul className="header">
            <li className="fa fa-home">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="fa fa-laptop">
              <NavLink to="/product">Product</NavLink>
            </li>
            <li className="fa fa-shopping-cart">
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li className="fa fa-info">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="logout">
              <button className="btn btn-danger" onClick={this.handleLogout}>
                Logout
              </button>{" "}
            </li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(App);
