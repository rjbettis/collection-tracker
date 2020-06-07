import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import coverNotFound from './images/No_image_available.png';
import Button from 'react-bootstrap/Button';

class GetResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedName: null,
      addedPlat: null,
      platChecked: null,
      gameId: null,
      coverUrl: null,
    };
  }

  componentDidMount() {
    this.setState({ search: this.props.searchResults });
  }

  async addGameApiCall(coverUrl, gameName, platform) {
    const addGame = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${gameName}&platform=${platform}&cover=${coverUrl}`
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

  async addGame(coverUrl, gameName, platform) {
    //adds game to dynamodb game table

    //

    //gets list of platforms in database
    const response = await fetch(
      'https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-platform-tabs'
    );
    const res = await response.json();
    this.setState({ platform: res });

    this.state.platform.forEach((plat, index) => {
      if (plat.platform === this.props.platform) {
        console.log('adding...');
        console.log(gameName);
        console.log(coverUrl);
        console.log(platform);

        this.addGameApiCall(coverUrl, gameName, platform);
      } else {
        console.log('add ' + this.props.platform);
        this.addPlatformApiCall(coverUrl, gameName, platform);
      }
    });
  }

  checkForFront(side) {}

  render() {
    return this.props.searchResults ? (
      <Container>
        {this.props.searchResults.games.map((game, index) => {
          let coverUrl = '';

          return this.props.boxart.boxart.data[game.id] ? (
            //runs if there is an image
            <Container key={game.id}>
              <Card className="my-1">
                <Media>
                  {this.props.boxart.boxart.data[game.id].map((img, index) => {
                    console.log(img.side);
                    if (img.side === 'front') {
                      coverUrl =
                        'https://cdn.thegamesdb.net/images/thumb/' +
                        img.filename;

                      return (
                        <img
                          key={index}
                          alt="cover"
                          className="mx-2 my-2"
                          src={coverUrl}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}

                  <Media.Body className="my-2">
                    <h6>
                      <strong>{game.game_title}</strong>
                      {}
                    </h6>
                  </Media.Body>
                  <Button
                    className="my-2 mx-2"
                    variant="secondary"
                    type="submit"
                    onClick={(event) =>
                      this.addGame(
                        coverUrl,
                        game.game_title,
                        this.props.platform
                      )
                    }
                  >
                    {this.state.addedGameId === game.id ? 'Added' : 'Add Game'}
                  </Button>
                </Media>
              </Card>
            </Container>
          ) : (
            //runs if there is NOT an image
            <Container key={game.game_title}>
              <Card className="my-1">
                <Media>
                  <img className="mx-2 my-2" src={coverNotFound} alt="cover" />
                  <Media.Body className="my-2">
                    <h6>
                      <strong>{game.game_title}</strong>
                      {}
                    </h6>
                  </Media.Body>
                  {}
                </Media>
              </Card>
            </Container>
          );
        })}
      </Container>
    ) : (
      <Container>Loading</Container>
    );
  }
}

export default GetResults;
