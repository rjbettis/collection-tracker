import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import coverNotFound from './images/No_image_available.png';

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

  render() {
    return this.props.searchResults ? (
      <Container>
        {this.props.searchResults.games.map((game, index) => {
          //let imageUrl =
          //'https://cdn.thegamesdb.net/images/thumb/' +
          //this.props.boxart.boxart.data[game.id][0].filename;

          return this.props.boxart.boxart.data[game.id] ? (
            <Container key={game.game_title}>
              <Card className="my-1">
                <Media>
                  {this.props.boxart.boxart.data[game.id].map((img, index) => {
                    if (img.side === 'front') {
                      let cover =
                        'https://cdn.thegamesdb.net/images/thumb/' +
                        img.filename;
                      console.log(cover);
                      return <img className="mx-2 my-2" src={cover} />;
                    }
                  })}

                  <Media.Body className="my-2">
                    <h6>
                      <strong>{game.game_title}</strong>
                      {}
                    </h6>
                  </Media.Body>
                </Media>
              </Card>
            </Container>
          ) : (
            <Container></Container>
          );
        })}
      </Container>
    ) : (
      <Container>Loading</Container>
    );
  }
}

export default GetResults;
