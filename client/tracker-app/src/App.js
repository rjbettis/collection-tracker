import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";
//import "./App.css";

class App extends Component {
  state = {
    details: []
  };

  render() {
    return (
      <Router>
        <Container>
          <Navigation />
          <Route exact path="/search" component={Search} />
          <Route exact path="/profile" component={Profile} />
        </Container>
      </Router>
    );
  }
}

export default App;
