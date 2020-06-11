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

class GetResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
    };
  }

  componentDidMount() {
    this.setState({
      search: this.props.searchResults,
      showModal: false,
      cartCheckbox: false,
      manualCheckbox: false,
      boxCheckbox: false,
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
      if (plat.platform !== this.props.platform) {
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
    } else if (
      this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Cart Only';
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Manual Only';
    } else if (
      !this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Box Only';
    } else if (
      this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Cart and Box';
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Manual and Box';
    } else if (
      this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'Cart and Manual';
    } else if (
      !this.state.cartCheckbox &&
      this.state.manualCheckbox &&
      this.state.boxCheckbox
    ) {
      completeness = 'Manual and Box';
    } else if (
      !this.state.cartCheckbox &&
      !this.state.manualCheckbox &&
      !this.state.boxCheckbox
    ) {
      completeness = 'None';
    }

    console.log(completeness);

    this.addGame(
      this.state.gameCover,
      this.state.gameTitle,
      this.props.platform,
      completeness
    );

    this.handleClose();
  }

  render() {
    return this.props.searchResults ? (
      <Container>
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
                  Select the completeness that applies.
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

            <Card className="my-1">
              <Media>
                {this.props.boxart.boxart.data[game.id].map((img, index) => {
                  if (img.side === 'front') {
                    coverUrl =
                      'https://cdn.thegamesdb.net/images/thumb/' + img.filename;

                    return (
                      <Col lg={3}>
                        <img
                          key={index}
                          alt="cover"
                          className="mx-2 my-2"
                          src={coverUrl}
                        />
                      </Col>
                    );
                  } else {
                    return null;
                  }
                })}

                <Media.Body className="my-2">
                  <strong>{game.game_title}</strong>
                  <br />
                  {this.props.platform}
                  <br />
                  Released:{' ' + game.release_date}
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
                      this.props.platform
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
                  {this.props.platform}
                  <br />
                  Released:{' ' + game.release_date}
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
    ) : (
      <Container>Loading</Container>
    );
  }
}

export default GetResults;
