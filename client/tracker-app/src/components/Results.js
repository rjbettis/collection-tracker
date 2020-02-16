import React, { Component } from "react";
import PropTypes from "prop-types";
import coverNotFound from "./images/No_image_available.png";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

var platChecked = "";

class Results extends Component {
  state = {
    addedName: "",
    addedPlat: "",
    addedBool: false
  };

  async addGame(name, cover, platChecked) {
    //adds game to dynamodb game table
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${name}&platform=${platChecked}&cover=${cover}`
    );
    const res = await response.json();

    //adds platform to dynamodb platform table if it does not exist
    const response2 = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-platform?platform=${platChecked}`
    );
    const res2 = await response2.json();

    this.setState({
      addedName: res,
      addedPlat: res2,
      addedBool: true
    });
  }

  platCheck = event => {
    platChecked = event.target.id;
  };

  render() {
    const games2 = this.props.searchResults.map(game => {
      const imageUrl = game.cover
        ? "https://images.igdb.com/igdb/image/upload/t_cover_big/" +
          game.cover.image_id +
          ".jpg"
        : coverNotFound;
      var gameName = game["name"];

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
                        id={abbr.abbreviation}
                        onChange={event => this.platCheck(event)}
                      />
                    );
                    //platform does not exist
                  })
                ) : (
                  <Form.Check
                    inline
                    label="No Platform"
                    type="radio"
                    id={"No Platform"}
                    onChange={event => this.platCheck(event)}
                  />
                )}
              </Media.Body>
              <Button
                className="my-2 mx-2"
                variant="secondary"
                type="submit"
                onClick={e => this.addGame(gameName, imageUrl, platChecked)}
              >
                Add Game
              </Button>
            </Media>
          </Card>
        </Container>
      );
    });

    return (
      <div>
        <h1>Results</h1>
        {games2}
      </div>
    );
  }
}

// PropTypes
Results.propTypes = {
  searchResults: PropTypes.array.isRequired
};

export default Results;
