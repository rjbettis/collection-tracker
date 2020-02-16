import React, { Component } from "react";
import Collection from "./../Collection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class Profile extends Component {
  render() {
    return (
      <Container id="grey">
        <Row>
          <Col id="lightgrey">
            <h1>Profile</h1>
            <p>Filter collection by platform.</p>
            <Collection />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
