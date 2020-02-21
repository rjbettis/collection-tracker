import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import coverNotFound from './images/No_image_available.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

export class GetCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      removed: []
    };
  }

  async componentDidMount() {
    this.loadGames();
  }

  async loadGames() {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-games?platform=${this.props.platform}`
    );
    const res = await response.json();
    this.setState({ games: res });
  }

  async removeGame(id, platform) {
    await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/delete-game?id=${id}&platform=${platform}`
    );
    this.loadGames();
  }

  render() {
    return (
      <div>
        {this.state.games.map(game => {
          let gameId = game['id'];
          let gamePlatform = game['platform'];

          let cover = '';
          if (game.cover === 'data:image/png') {
            cover = coverNotFound;
          } else {
            cover = game.cover;
          }

          return (
            <React.Fragment>
              <Card className="my-1">
                <Media>
                  <img className="mx-2 my-2" src={cover} alt="cover" />
                  <Media.Body className="my-2">
                    <h6>
                      <strong>{game.name}</strong>
                    </h6>
                    Completion
                    <br />
                    Condition
                  </Media.Body>
                  <Button
                    className="my-2 mx-2"
                    variant="secondary"
                    type="submit"
                    onClick={e => this.removeGame(gameId, gamePlatform)}
                  >
                    Remove Game
                  </Button>
                </Media>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default GetCollection;
