import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';


class App extends Component {
  
  state = {
    details: []
  }

  render() {
    return (
      <div className="App">
        <Search />
        <p>
        {
        //JSON.stringify(this.state.details)
        }
        </p>
      </div>
    );
  }
}

export default App;