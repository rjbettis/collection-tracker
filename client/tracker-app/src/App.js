import React from 'react';
import './App.css';

class App extends React.Component {
  
  state = {
    details: []
  }

  componentDidMount() {
    
    fetch('https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-details')
    .then(response => response.json())
    .then(res => this.setState( { details:res }));
  }


  render() {

    console.log(this.state.details);
    return (
      
      
      <div>
        <p>
        {
        JSON.stringify(this.state.details)
        }
        </p>
      
      <p>{}</p>

      
      </div>
    );
  }
}

export default App;