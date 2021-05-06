import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";

const About = () => {
  return (
    <div className="bg d-flex justify-content-center">
      <Card style={{ width: "24rem" }} className="card mt-4 mb-4">
        <Card.Img variant="top" src="/images/revindaamalias.JPG" />
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title>Middle Exam - Washing Machine</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush bio text-center">
          <ListGroupItem>Revinda Amalia Saktyawati</ListGroupItem>
          <ListGroupItem>NIM : 1841720185</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};
export default About;
