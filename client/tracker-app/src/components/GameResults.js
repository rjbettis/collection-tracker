import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import coverNotFound from './images/No_image_available.png'

export class GameResults extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            games:[]
        };
      }
    
    componentDidMount() {
        fetch(`https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-games?platform=${this.props.platform}`)
        .then(response => {
            return response.json();
        })
        .then(res => this.setState( { games:res }));
    }
    
    render() {

        return (
            <div>
                { 
                    this.state.games.map((game) => {
                    var cover = ""
                    if (game.cover === "data:image/png") {
                        cover = coverNotFound
                    } else {
                        cover = game.cover
                    }
                    
                    return( 
                        <React.Fragment>
                            <div class="content">
                                <img src={cover}></img>
                                <div class="text">
                                    <h4><strong>{game.name}</strong></h4>
                                    <p>text</p>
                                </div>
                            </div>
                            <hr/>
                        </React.Fragment>
                    )}) 
                    
                }
            </div>
        )
    }
}


export default GameResults;