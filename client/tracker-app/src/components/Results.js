import React, { Component } from "react";
import PropTypes from "prop-types";
import coverNotFound from "./images/No_image_available.png";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

var platChecked = "";

class Results extends Component {
  state = {
    addedName: "",
    addedPlat: "",
    addedBool: false
  };

  async addGame(name, cover, platChecked) {
    console.log(name);
    console.log(cover);
    console.log(platChecked);
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${name}&platform=${platChecked}&cover=${cover}`
    );
    const res = await response.json();

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
        <React.Fragment>
          <Card body>
            <h4>{gameName}</h4>
            <img
              width={100}
              height="auto"
              key={gameName + "Cover"}
              src={imageUrl}
              alt="cover"
            />

            {game.platforms !== undefined ? (
              game.platforms.map(abbr => {
                //platform exists
                return (
                  <React.Fragment>
                    <Form.Check
                      inline
                      label={abbr.abbreviation}
                      type="radio"
                      name="platGroup"
                      id={abbr.abbreviation}
                      onChange={event => this.platCheck(event)}
                    />
                  </React.Fragment>
                );
                //platform does not exist
              })
            ) : (
              <React.Fragment>
                <Form.Check
                  inline
                  label="No Platform"
                  type="radio"
                  id={"No Platform"}
                  onChange={event => this.platCheck(event)}
                />
              </React.Fragment>
            )}

            <Button
              variant="secondary"
              type="submit"
              onClick={e =>
                this.addGame(
                  gameName,
                  imageUrl,
                  platChecked,
                  this.state.addedBool
                )
              }
            >
              Add Game
            </Button>
          </Card>
        </React.Fragment>
      );
    });

    //changes added label to green when addedBool state equals true
    let label;
    if (this.state.addedBool === true) {
      label = (
        <h2>
          <label className="added">{this.state.added}</label>
        </h2>
      );
    } else {
      label = (
        <h2>
          <label></label>
        </h2>
      );
    }

    return (
      <div>
        <h1>Results</h1>
        {label}
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
