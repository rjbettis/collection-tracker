import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Search from './components/pages/Search';
import Profile from './components/pages/Profile';
import './App.css';


class App extends Component {
  
  state = {
    details: []
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;