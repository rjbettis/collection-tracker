import React, { Component } from 'react';
import SearchDB from './../SearchDB';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Profile extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className={'lightgrey'}>
            <h1>Search</h1>
            <SearchDB />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
