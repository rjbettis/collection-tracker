import React, { Component } from 'react';

class Search extends Component {

    state = {
        searchValue: '',
        results: []
    };

    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
    };

    makeApiCall = searchInput => {
        var searchUrl = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/game-details?search=${searchInput}`;

        fetch(searchUrl)
        .then(response => {
            return response.json();
        })
        .then(res => this.setState( { results:res }));
    };

    render() {
        return(
            <div>
                <h1>Search</h1>
                <input 
                    name="text" 
                    type="text" 
                    placeholder="Search" 
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;