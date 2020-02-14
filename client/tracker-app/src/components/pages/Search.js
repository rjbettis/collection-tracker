import React, { Component } from "react";
import SearchDB from "./../SearchDB";
import Container from "react-bootstrap/Container";

export class Profile extends Component {
  render() {
    return (
      <Container>
        <h1>Search</h1>
        <SearchDB />
      </Container>
    );
  }
}

export default Profile;
