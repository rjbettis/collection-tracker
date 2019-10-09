import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';

class App extends Component {
  
  state = {
    details: []
  }

  /*
  componentDidMount() {
    
    fetch('https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/game-details?search=mario')
    .then(response => response.json())
    .then(res => this.setState( { details:res }));
  }

*/
  render() {
    //console.log(this.state.details);
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