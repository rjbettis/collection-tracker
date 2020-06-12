import React, { Component } from 'react';
import GetResults from './GetResults';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PlatformList from '../data/platforms.json';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
      segaBtn: 'Sega',
    };
  }

  componentDidMount() {
    this.setState({ platformList: PlatformList.platforms });
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = (e) => {
    if (
      (this.state.nintendoBtn === 'Nintendo' &&
        !this.state.segaBtn === 'Sega') ||
      (!this.state.nintendoBtn === 'Nintendo' && this.state.segaBtn === 'Sega')
    ) {
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

  handleNintendoSelect = (event) => {
    this.setState({ platform: event });
    this.setState({ segaBtn: 'Sega' });
    this.setState({ displayResults: false });
    this.setState({ searchValue: '' });
    let selectedPlatformId = event;

    this.state.platformList.forEach((plat, index) => {
      if (selectedPlatformId === plat.id) {
        this.setState({ nintendoBtn: plat.name });
      }
    });
  };

  handleSegaSelect = (event) => {
    this.setState({ platform: event });
    this.setState({ nintendoBtn: 'Nintendo' });
    this.setState({ displayResults: false });
    this.setState({ searchValue: '' });
    let selectedPlatformId = event;

    this.state.platformList.forEach((plat, index) => {
      if (selectedPlatformId === plat.id) {
        this.setState({ segaBtn: plat.name });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonGroup className="mr-2">
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.nintendoBtn}
            size="sm"
            variant="secondary"
            onSelect={(event) => this.handleNintendoSelect(event)}
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
        </ButtonGroup>

        <ButtonGroup className="mr-2">
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.segaBtn}
            size="sm"
            variant="secondary"
            onSelect={(event) => this.handleSegaSelect(event)}
          >
            <Dropdown.Item eventKey="33">32X</Dropdown.Item>
            <Dropdown.Item eventKey="21">Sega CD</Dropdown.Item>
            <Dropdown.Item eventKey="16">Dreamcast</Dropdown.Item>
            <Dropdown.Item eventKey="20">Game Gear &amp; Watch</Dropdown.Item>
            <Dropdown.Item eventKey="18">Genesis</Dropdown.Item>
            <Dropdown.Item eventKey="35">Master System</Dropdown.Item>
            <Dropdown.Item eventKey="36">Mega Drive</Dropdown.Item>
            <Dropdown.Item eventKey="4958">Pico</Dropdown.Item>
            <Dropdown.Item eventKey="4949">SG-1000</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>

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
            platform={this.state.platform}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchDB;
