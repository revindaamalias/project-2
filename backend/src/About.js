import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";

// import Keranjang from "./Keranjang";
// import Product from "./Product";
// import Home from "./Home";
// // import About from "./About";
// import Navigation from "./Navigation";

const About = () => {
  return (
    <div>
      <Card>
        <Card.Img
          variant="top"
          width="100%"
          height="100%"
          src="/images/House for Sale Flyer.jpg"
        />
      </Card>
    </div>
  );
};
export default About;
