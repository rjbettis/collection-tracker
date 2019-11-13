import React, { Component } from 'react';
import Results from './Results';

class Search extends Component {

    state = {
        searchValue: '',
        displayResults: false,
        searchResults: []
    };

    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);

        this.setState({displayResults: !this.state.displayQuestions})

    };

    makeApiCall = searchInput => {
        var searchUrl = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/game-details?search=${searchInput}`;

        fetch(searchUrl)
        .then(response => {
            return response.json();
        })
        .then(res => this.setState( { searchResults:res }));

    };

    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
        }
    }

    render() {
        return(
            <div style={this.getStyle()}>
                <h1>Search</h1>              
                <input 
                    name="Game" 
                    type="text" 
                    placeholder="Game" 
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue}
                />
                {this.state.displayResults ?
                <Results searchResults={this.state.searchResults}/> :
                null
                }
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;