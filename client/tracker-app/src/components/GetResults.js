import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coverNotFound from './images/No_image_available.png';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';

class GetResults extends Component {
  state = {
    addedName: null,
    addedPlat: null,
    platChecked: null
  };

  async addGame(gameId, name, cover, platChecked) {
    console.log(platChecked);
    //adds game to dynamodb game table
    const addGame = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${name}&platform=${platChecked}&cover=${cover}`
    );
    const addGameRes = await addGame.json();

    //adds platform to dynamodb platform table if it does not exist
    const addPlat = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-platform?platform=${platChecked}`
    );
    const addPlatRes = await addPlat.json();

    this.setState({
      addedName: addGameRes,
      addedPlat: addPlatRes,
      addedGameId: gameId
    });
  }

  platCheck(event, plat) {
    console.log(event);
    this.setState({ platChecked: plat });
  }

  render() {
    const gamesList = this.props.searchResults.map(game => {
      let imageUrl = game.cover
        ? 'https://images.igdb.com/igdb/image/upload/t_cover_big/' +
          game.cover.image_id +
          '.jpg'
        : coverNotFound;
      let gameName = game['name'];

      return (
        <Container>
          <Card className="my-1">
            <Media>
              <img className="mx-2 my-2" src={imageUrl} alt="cover" />
              <Media.Body className="my-2">
                <h6>
                  <strong>{gameName}</strong>
                </h6>

                {game.platforms !== undefined ? (
                  game.platforms.map(abbr => {
                    //platform exists
                    return (
                      <Form.Check
                        inline
                        label={abbr.abbreviation}
                        type="radio"
                        name="platGroup"
                        id={gameName + ' ' + abbr.abbreviation}
                        onChange={event =>
                          this.platCheck(event, abbr.abbreviation)
                        }
                      />
                    );
                    //platform does not exist
                  })
                ) : (
                  <Form.Check
                    inline
                    label="No Platform"
                    type="radio"
                    id={'No Platform'}
                    onChange={event => this.platCheck(event)}
                  />
                )}
              </Media.Body>
              <Button
                className="my-2 mx-2"
                variant="secondary"
                type="submit"
                onClick={e =>
                  this.addGame(
                    game.id,
                    gameName,
                    imageUrl,
                    this.state.platChecked
                  )
                }
              >
                {this.state.addedGameId === game.id ? 'Added' : 'Add Game'}
              </Button>
            </Media>
          </Card>
        </Container>
      );
    });

    return <div>{gamesList}</div>;
  }
}

// PropTypes
GetResults.propTypes = {
  searchResults: PropTypes.array.isRequired
};

export default GetResults;
