import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coverNotFound from './images/No_image_available.png'

var platChecked = '';

class Results extends Component {

    state = {
        added: "",
        addedBool: false
    };

    addGame(name, cover, platChecked) {

        var addGame = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=${name}&platform=${platChecked}&cover=${cover}`;
        var addPlatform = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-platform?platform=${platChecked}`;

        fetch(addGame)
        .then(response => {
            return response.json();
        });
        
        fetch(addPlatform)
        .then(response => {
            return response.json();
        });

        this.setState({
            added: "Added " + name,
            addedBool: true
        });
    }

    platCheck = event => {
        platChecked = event.target.value
    }

    render() {
        const games2 = this.props.searchResults.map((game) => {
            
            const imageUrl = game.cover ? 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg' : coverNotFound;
            var gameName = game["name"];
            
            return (
                <React.Fragment>
                    <div class="content">
                        <img key={gameName + 'Cover'} src={imageUrl} alt="cover"></img>
                        <div class="text">
                            <h4>{gameName}</h4>
                            { game.platforms !== undefined ? game.platforms.map((abbr) => {
                                //platform exists
                                return (
                                    <React.Fragment>
                                            <input 
                                                type="radio" 
                                                name="platRadio" 
                                                onChange={event => this.platCheck(event)} 
                                                value={ abbr.abbreviation } 
                                            />
                                            <label>{abbr.abbreviation + " " }</label>
                                    </React.Fragment>
                                )
                                //platform does not exist
                                }) : <React.Fragment>
                                        <input 
                                        type="radio" 
                                        name="platRadio" 
                                        onChange={event => this.platCheck(event)} 
                                        value={ "No Platform" } />
                                        <label>{ "No Platform" }</label>
                                    </React.Fragment>
                                }
                            <br/>
                            <br/>
                            <input
                                type="submit"
                                value="Add Game"
                                className="btn"
                                style={{flex: '1'}}
                                onClick={e => this.addGame(gameName, imageUrl, platChecked, this.state.addedBool)}
                            />
                        </div>
                    </div>
                    <hr/>
                </React.Fragment>
            )
        });

        //changes added label to green when addedBool state equals true
        let label;
        if (this.state.addedBool === true) {
            label = <h2><label className="added">{this.state.added}</label></h2>
        } else {
            label = <h2><label></label></h2>
        }

        return(
            <div>
                <h1>Results</h1>
                { label }
                { games2 }
            </div>
        );
    }
}

// PropTypes
Results.propTypes = {
    searchResults: PropTypes.array.isRequired
}

export default Results;