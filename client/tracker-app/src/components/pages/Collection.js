import React, { Component } from 'react';
import GetCollection from '../GetCollection';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Collection extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <GetCollection />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Collection;
