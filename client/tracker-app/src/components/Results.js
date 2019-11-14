import React, { Component } from 'react';
import PropTypes from 'prop-types';

var platChecked = '';

class Results extends Component {

    state = {
        added: ""
    };

    addGame(name, cover, platChecked) {
        console.log(platChecked)
        
        var addGame = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-data?name=${name}&platform=${platChecked}&cover=${cover}`;

        fetch(addGame)
        .then(response => {
            return response.json();
        });

        this.setState({
            added: "Added " + name
        });
    }
    
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted'
        }
    }

    platCheck = event => {
        platChecked = event.target.value
    }

    render() {
        const games2 = this.props.searchResults.map((game) => {
            
            const imageUrl = game.cover ? 'https://images.igdb.com/igdb/image/upload/t_cover_small/' + game.cover.image_id + '.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
            var gameName = game["name"];

            return (
                <React.Fragment>
                    <p>
                        <img key={gameName + 'Cover'} src={imageUrl} style={{width:75, height:100}} alt="cover"></img>
                        <br/>
                        <button key={gameName} id={gameName} onClick={e => this.addGame(gameName, imageUrl, platChecked)} >{gameName}</button>
                        <br/>
                        { game.platforms !== undefined ? game.platforms.map((abbr) => {
                            return (
                                        <React.Fragment>
                                                <input type="radio" name="platRadio" onChange={event => this.platCheck(event)} value={ abbr.abbreviation } />
                                                <label>{abbr.abbreviation + " " }</label>
                                        </React.Fragment>
                                    )
                            }) : <label>No Platform</label>}
                            <br/><br/><br/>
                    </p>
                </React.Fragment>
            )
        });

        return(
            <div style={this.getStyle()}>
                <h1>Results</h1>
                <br></br>
                <h2><label>{this.state.added}</label></h2>
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