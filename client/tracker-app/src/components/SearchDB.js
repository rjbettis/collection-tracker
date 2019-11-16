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

    handleSearch = (e) => {
        e.preventDefault();
        this.makeApiCall(this.state.searchValue);
        this.setState({displayResults: !this.state.displayQuestions})
    };

    makeApiCall = searchInput => {
        var searchUrl = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/search-igdb?search=${searchInput}`;

        fetch(searchUrl)
        .then(response => {
            return response.json();
        })
        .then(res => this.setState( { searchResults:res }));
    };

    getStyle = () => {
        return {
            padding: '10px',
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSearch} style={{ display: 'flex' }}>
                    <input
                        type="text"
                        name="game"
                        placeholder="Add Game..."
                        style={{ flex: '10', padding: '5px'}}
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.searchValue}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn"
                        style={{flex: '1'}}
                    />
                </form>
                { this.state.displayResults ? <Results searchResults={this.state.searchResults}/> : null }

            </div>
        );
    }
}

export default Search;