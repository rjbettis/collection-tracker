import React, { Component } from 'react';

class Results extends Component {

    

    render() {

        //var foo = this.props.searchResults;


        return(
            <div>
                <h1>Results</h1>
                {JSON.stringify(this.props.searchResults[0])}
                {console.log(Object.values(this.props.searchResults))}
            </div>
        );
    }
}

export default Results;