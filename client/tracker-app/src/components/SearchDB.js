import React, { Component } from "react";
import Results from "./Results";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SearchDB extends Component {
  state = {
    searchValue: "",
    displayResults: false,
    searchResults: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.makeApiCall(this.state.searchValue);
    this.setState({ displayResults: !this.state.displayQuestions });
  };

  async makeApiCall(searchInput) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/search-igdb?search=${searchInput}`
    );
    const res = await response.json();
    this.setState({ searchResults: res });
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSearch}>
          <Form.Group controlId="formSearch">
            <Form.Label>Search for games to add to your collection.</Form.Label>
            <Form.Control
              placeholder="Add Game"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>

        {this.state.displayResults ? (
          <Results searchResults={this.state.searchResults} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchDB;
