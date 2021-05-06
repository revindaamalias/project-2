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
} from "reactstrap";

import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import About from "./About";
import AddProduct from "./AddProduct";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand to="/">Washing Machine</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/Home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/About">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Product">Product</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/AddProduct">Add Product</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>revindaamalias</NavbarText>
        </Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Product" component={Product} />
        <Route exact path="/AddProduct" component={AddProduct} />
        <Route path="/About" component={About} />
      </Switch>
    </div>
  );
};

export default Navigation;
