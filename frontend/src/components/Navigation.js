import { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";

handleLogout = () => {
  const { dispatch } = this.props;
  dispatch(logoutUser());

  return (
    <Button color="warning" onClick={this.handleLogout}>
      Logout
    </Button>
  );
};

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Washing Machine</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/product">Product</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/keranjang">Cart</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>revindaamalias</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(App);
