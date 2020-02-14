import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Collection Tracker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/search">Search</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default Navigation;
