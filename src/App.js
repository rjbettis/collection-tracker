import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navigation from './components/Navigation';
import Search from './components/pages/Search';
import Collection from './components/pages/Collection';
import './App.css';
import Home from './components/pages/Home';

class App extends Component {
  state = {
    details: [],
  };

  render() {
    return (
      <Router>
        <Container fluid={true} className="zero-padding">
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/collection" component={Collection} />
        </Container>
      </Router>
    );
  }
}

export default App;
