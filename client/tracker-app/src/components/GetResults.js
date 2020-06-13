import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import coverNotFound from './images/No_image_available.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PlatformList from '../data/platforms.json';
import DeveloperList from '../data/developers.json';

class GetResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developerList: DeveloperList,
    };
  }

  componentDidMount() {
    this.setState({
      showModal: false,
      cartCheckbox: false,
      manualCheckbox: false,
      boxCheckbox: false,
      completenessPrompt: 'Select the completeness that applies',
    });

    PlatformList.platforms.forEach((plat, index) => {
      if (this.props.platform === plat.id) {
        this.setState({ platformName: plat.name });
      }
    });
  }

  async addGame(coverUrl, gameName, platform, completeness) {
    //gets list of platforms in database
    const response = await fetch(
      'https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-platform-tabs'
    );
    const res = await response.json();
    this.setState({ platform: res });

    this.state.platform.forEach((plat, index) => {
      if (plat.platform !== this.state.platformName) {
        this.addPlatformApiCall(coverUrl, gameName, platform, completeness);
      }
    });
    this.addGameApiCall(coverUrl, gameName, platform, completeness);
  }

  async addGameApiCall(coverUrl, gameName, platform, completeness) {
    const addGame = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${gameName}&platform=${platform}&cover=${coverUrl}&completeness=${completeness}`
    );
    const addGameRes = await addGame.json();
    this.setState({
      addedName: addGameRes,
    });
  }

  async addPlatformApiCall(coverUrl, gameName, platform) {
    const addPlat = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-platform?platform=${platform}`
    );
    const addPlatRes = await addPlat.json();
    this.setState({
      addedPlat: addPlatRes,
    });
  }

  handleShow(title, cover) {
    this.setState({ showModal: true, gameTitle: title, gameCover: cover });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleCartToggle(event) {
    if (this.state.cartCheckbox === false) {
      this.setState({ cartCheckbox: true });
    } else if (this.state.cartCheckbox === true) {
      this.setState({ cartCheckbox: false });
    }
  }

  handleManualToggle(event) {
    if (this.state.manualCheckbox === false) {
      this.setState({ manualCheckbox: true });
    } else if (this.state.manualCheckbox === true) {
      this.setState({ manualCheckbox: false });
    }
  }

  handleBoxToggle(event) {
    if (this.state.boxCheckbox === false) {
      this.setState({ boxCheckbox: true });
    } else if (this.state.boxCheckbox === true) {
      this.setState({ boxCheckbox: false });
    }
  }

  handleSubmit(event) {
    let completeness = '';
    if (
      this.state.cartCheckbox === true &&
      this.state.manualCheckbox === true &&
      this.state.boxCheckbox === true
    ) {
      completeness = 'Complete in Box';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Cart Only';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Manual Only';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      !this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Box Only';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Cart and Box';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Manual and Box';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Cart and Manual';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Manual and Box';
      this.addGame(
        this.state.gameCover,
        this.state.gameTitle,
        this.state.platformName,
        completeness
      );
      this.handleClose();
    } else if (
      !this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      this.setState({
        completenessPrompt: 'You must select at least one option.',
      });
    }

    console.log(completeness);
  }

  render() {
    return this.props.searchResults ? (
      <Container fluid>
        <Modal
          show={this.state.showModal}
          onHide={(event) => this.handleClose(event)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.gameTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm="auto">
                  <img key="cover" alt="gameCover" src={this.state.gameCover} />
                </Form.Label>
                <Col sm="auto">
                  {this.state.completenessPrompt}
                  <br />
                  <br />
                  {this.state.selectCompleteness}
                  <Form.Check
                    type="checkbox"
                    label="Cart"
                    id="1"
                    name="formHorizontalRadios"
                    onClick={(event) => this.handleCartToggle(event)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Manual"
                    id="2"
                    name="formHorizontalRadios"
                    onClick={(event) => this.handleManualToggle(event)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Box"
                    id="3"
                    name="formHorizontalRadios"
                    onClick={(event) => this.handleBoxToggle(event)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(event) => this.handleClose(event)}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              onClick={(event) => this.handleSubmit(event)}
            >
              Add to Collection
            </Button>
          </Modal.Footer>
        </Modal>

        {this.props.searchResults.games.map((game, index) => {
          let coverUrl = '';

          return this.props.boxart.boxart.data[game.id] ? (
            //runs if there is an image

            <Card className="card">
              <Media>
                {//gets cover image
                this.props.boxart.boxart.data[game.id].map((img, index) => {
                  if (img.side === 'front') {
                    coverUrl =
                      'https://cdn.thegamesdb.net/images/thumb/' + img.filename;

                    return (
                      <Col lg={2}>
                        <img
                          key={index}
                          alt="cover"
                          className="mx-1 my-1"
                          src={coverUrl}
                        />
                      </Col>
                    );
                  } else {
                    return null;
                  }
                })}

                <Media.Body className="my-2">
                  <Row>
                    <Col xl={5}>
                      <strong>{game.game_title}</strong>
                    </Col>
                    <Col>
                      {PlatformList.platforms.map((plat, index) => {
                        var platformNum = game.platform;
                        var platformNumStr = platformNum.toString();
                        if (platformNumStr === plat.id) {
                          return <React.Fragment>{plat.name}</React.Fragment>;
                        }
                      })}
                    </Col>
                    <Col xl={2}>{game.release_date}</Col>
                  </Row>
                </Media.Body>
                <Button
                  className="my-2 mx-2"
                  variant="secondary"
                  type="submit"
                  onClick={(event) =>
                    this.handleShow(
                      game.game_title,
                      coverUrl,
                      game.release_date,
                      this.state.platformName
                    )
                  }
                >
                  {this.state.addedGameId === game.id ? 'Added' : 'Add Game'}
                </Button>
              </Media>
            </Card>
          ) : (
            //runs if there is NOT an image
            <Card className="my-1">
              <Media>
                <Col lg={3}>
                  <img className="mx-2 my-2" src={coverNotFound} alt="cover" />
                </Col>
                <Media.Body className="my-2">
                  <strong>{game.game_title}</strong>
                  <br />
                  {this.state.platformName}
                  <br />
                  {game.release_date}
                </Media.Body>
                <Button
                  className="my-2 mx-2"
                  variant="secondary"
                  type="submit"
                  onClick={(event) =>
                    this.handleShow(game.game_title, coverUrl)
                  }
                >
                  {this.state.addedGameId === game.id ? 'Added' : 'Add Game'}
                </Button>
              </Media>
            </Card>
          );
        })}
      </Container>
    ) : null;
  }
}

export default GetResults;
