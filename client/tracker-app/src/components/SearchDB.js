import React, { Component } from 'react';
import GetResults from './GetResults';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class SearchDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      displayResults: '',
      searchResults: {},
      platform: '',
      searchPrompt: 'Search for games to add to your collection.',
      nintendoBtn: 'Nintendo',
    };
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = (e) => {
    if (this.state.nintendoBtn === 'Nintendo') {
      e.preventDefault();
      this.setState({ searchPrompt: 'Please choose a console platform' });
    } else {
      e.preventDefault();
      this.makeApiCall(this.state.searchValue, this.state.platform);
      this.setState({ displayResults: !this.state.displayQuestions });
    }
  };

  async makeApiCall(searchInput, platform) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/search-tgdb?search=${searchInput}&platform=${platform}`
    );
    const res = await response.json();
    this.setState({ searchResults: res });
  }

  handleSelect = (event) => {
    this.setState({ platform: event });

    switch (event) {
      case '4912':
        this.setState({ nintendoBtn: '3DS' });
        break;
      case '8':
        this.setState({ nintendoBtn: 'DS' });
        break;
      case '4936':
        this.setState({ nintendoBtn: 'Famicom Disk System' });
        break;
      case '4950':
        this.setState({ nintendoBtn: 'Game & Watch' });
        break;
      case '4':
        this.setState({ nintendoBtn: 'Game Boy' });
        break;
      case '5':
        this.setState({ nintendoBtn: 'Game Boy Advance' });
        break;
      case '41':
        this.setState({ nintendoBtn: 'Game Boy Color' });
        break;
      case '2':
        this.setState({ nintendoBtn: 'GameCube' });
        break;
      case '7':
        this.setState({ nintendoBtn: 'Nintendo Entertainment System (NES)' });
        break;
      case '3':
        this.setState({ nintendoBtn: 'Nintendo 64' });
        break;
      case '4957':
        this.setState({ nintendoBtn: 'Pokémon Mini' });
        break;
      case '6':
        this.setState({ nintendoBtn: 'Super Nintendo (SNES)' });
        break;
      case '4971':
        this.setState({ nintendoBtn: 'Switch' });
        break;
      case '4918':
        this.setState({ nintendoBtn: 'Virtual Boy' });
        break;
      case '9':
        this.setState({ nintendoBtn: 'Wii' });
        break;
      case '38':
        this.setState({ nintendoBtn: 'Wii U' });
        break;
      default:
        this.setState({ nintendoBtn: 'Nintendo' });
    }
  };

  render() {
    return (
      <React.Fragment>
        <DropdownButton
          id="dropdown-basic-button"
          title={this.state.nintendoBtn}
          size="sm"
          variant="secondary"
          onSelect={(event) => this.handleSelect(event)}
        >
          <Dropdown.Item eventKey="4912">3DS</Dropdown.Item>
          <Dropdown.Item eventKey="8">DS</Dropdown.Item>
          <Dropdown.Item eventKey="4936">Famicom Disk System</Dropdown.Item>
          <Dropdown.Item eventKey="4950">Game &amp; Watch</Dropdown.Item>
          <Dropdown.Item eventKey="4">Game Boy</Dropdown.Item>
          <Dropdown.Item eventKey="5">Game Boy Advanced</Dropdown.Item>
          <Dropdown.Item eventKey="41">Game Boy Color</Dropdown.Item>
          <Dropdown.Item eventKey="2">GameCube</Dropdown.Item>
          <Dropdown.Item eventKey="7">
            Nintendo Entertainment System (NES)
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">Nintendo 64</Dropdown.Item>
          <Dropdown.Item eventKey="4957">Pokémon Mini</Dropdown.Item>
          <Dropdown.Item eventKey="6">Super Nintendo (SNES)</Dropdown.Item>
          <Dropdown.Item eventKey="4971">Switch</Dropdown.Item>
          <Dropdown.Item eventKey="4918">Virtual Boy</Dropdown.Item>
          <Dropdown.Item eventKey="9">Wii</Dropdown.Item>
          <Dropdown.Item eventKey="38">Wii U</Dropdown.Item>
        </DropdownButton>

        <Form onSubmit={this.handleSearch}>
          <Form.Group controlId="formSearch">
            <Form.Label>{this.state.searchPrompt}</Form.Label>

            <Form.Control
              placeholder="Add Game"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>

        {this.state.displayResults ? (
          <GetResults
            searchResults={this.state.searchResults.data}
            boxart={this.state.searchResults.include}
            platform={this.state.nintendoBtn}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchDB;
