import React, { Component } from "react";
import CollectionTabs from "../CollectionTabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class Collection extends Component {
  render() {
    return (
      <Container id="grey">
        <Row>
          <Col id="lightgrey">
            <h1>My Collection</h1>
            <p>Filter collection by platform.</p>
            <CollectionTabs />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Collection;
