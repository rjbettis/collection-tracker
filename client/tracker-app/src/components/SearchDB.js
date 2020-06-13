import React, { Component } from 'react';
import GetResults from './GetResults';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PlatformList from '../data/platforms.json';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NintendoList from '../data/nintendo.json';
import SegaList from '../data/sega.json';

class SearchDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      displayResults: '',
      searchResults: {},
      platform: '',
      platformName: '',
      nintendoList: NintendoList,
      segaList: SegaList,
    };
  }

  componentDidMount() {
    //Set PlatformList state to platforms.json
    this.setState({ platformList: PlatformList.platforms });
  }

  //Updates searchValue state when changes are made to the search box (every character typed by the user)
  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  //Runs when submit button is clicked
  handleSearch = (e) => {
    //Stops page from being re-rendered
    e.preventDefault();

    //Calls the async function to make the API call based on search input
    this.makeApiCall(this.state.searchValue, this.state.platform);
    this.setState({ displayResults: !this.state.displayQuestions });
  };

  //Gets search results from thegamesdb and sets results to the searchResults state
  async makeApiCall(searchInput, platform) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/search-tgdb?search=${searchInput}&platform=${platform}`
    );
    const res = await response.json();
    this.setState({ searchResults: res });
  }

  /*
   * Sets console platform selected in sidebar to "platform" state. Clears search results and search input if a new platform is selected.
   * loops through platformList state array to find platformId of the selected platform. When matched it gets the name of the platform and
   * sets it to platformName state.
   */
  handlePlatformSelect = (event) => {
    this.setState({ platform: event });
    this.setState({ displayResults: false });
    this.setState({ searchValue: '' });
    let selectedPlatformId = event;

    this.state.platformList.forEach((plat, index) => {
      if (selectedPlatformId === plat.id) {
        this.setState({ platformName: plat.name });
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <ButtonGroup vertical>
              {/*Nintendo Button*/}
              <DropdownButton
                id="bg-vertical-dropdown-1"
                title="Nintendo"
                variant="secondary"
                as={ButtonGroup}
                onSelect={(event) => this.handlePlatformSelect(event)}
              >
                {this.state.nintendoList.platforms.map((plat, index) => {
                  return (
                    <Dropdown.Item eventKey={plat.id}>
                      {plat.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>

              {/*Sega Button*/}
              <DropdownButton
                id="bg-vertical-dropdown-1"
                title="Sega"
                variant="secondary"
                as={ButtonGroup}
                onSelect={(event) => this.handlePlatformSelect(event)}
              >
                {this.state.segaList.platforms.map((plat, index) => {
                  return (
                    <Dropdown.Item eventKey={plat.id}>
                      {plat.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </ButtonGroup>
          </Col>
          <Col lg={11}>
            <Form onSubmit={this.handleSearch}>
              <Form.Group controlId="formSearch">
                <Form.Label>
                  Search for: <strong>{this.state.platformName}</strong>
                </Form.Label>

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

            {//displays search results when search form is submited
            this.state.displayResults ? (
              <Container fluid>
                <GetResults
                  searchResults={this.state.searchResults.data}
                  boxart={this.state.searchResults.include}
                  platform={this.state.platform}
                />
              </Container>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchDB;
