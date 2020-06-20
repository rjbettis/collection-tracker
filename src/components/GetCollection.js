import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import coverNotFound from './images/No_image_available.png';
import Table from 'react-bootstrap/Table';

export class GetCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: [],
      displayPlatform: '',
    };
  }

  async componentDidMount() {
    const response = await fetch(
      'https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-platform-tabs'
    );
    const res = await response.json();
    this.setState({ platform: res });
  }

  async handleClick(platform) {
    this.setState({ platformSelected: platform });
    this.loadGames(platform);
  }

  async loadGames(platform) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-games?platform=${platform}`
    );
    const res = await response.json();
    this.setState({ games: res });
  }

  async removeGame(sortName, platform) {
    console.log(sortName);
    console.log(platform);
    await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/delete-game?sortName=${sortName}&platform=${platform}`
    );
    this.handleClick(platform);
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col md="auto" lg="auto" xl="auto" className="zero-padding">
            <Row>
              <Container className="sidebar-margin">
                <ButtonGroup vertical className="btn btn-block zero-padding">
                  {this.state.platform.map((plat, index) => (
                    <Button
                      key={index}
                      size="md"
                      variant="secondary"
                      onClick={() => this.handleClick(plat.platform)}
                    >
                      {plat.platform}
                    </Button>
                  ))}
                </ButtonGroup>
              </Container>
            </Row>
          </Col>
          <Col>
            {this.state.games ? (
              <Container fluid>
                <h2>{this.state.platformSelected} Collection</h2>

                <Table size="sm">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Game Title</th>
                      <th>Console Platform</th>
                      <th>Release Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.games.map((game, index) => {
                      let sortName = game['sortName'];
                      let gamePlatform = game['platform'];

                      let cover = '';
                      if (game.cover === 'data:image/png') {
                        cover = coverNotFound;
                      } else {
                        cover = game.cover;
                      }
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              key={index}
                              alt="cover"
                              className="mx-1 my-1"
                              src={cover}
                            />
                          </td>
                          <td>{game.name}</td>
                          <td>{gamePlatform}</td>
                          <td>{game.completeness}</td>
                          <td>
                            <Button
                              className="my-2 mx-2"
                              variant="secondary"
                              type="submit"
                              onClick={(e) =>
                                this.removeGame(sortName, gamePlatform)
                              }
                            >
                              Remove Game
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            ) : (
              <h2>Select console collection to display</h2>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GetCollection;
