import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
                { this.state.games.map((game) => {
                    var cover = ""
                    if (game.cover == "data:image/png") {
                        cover = coverNotFound
                    } else {
                        cover = game.cover
                    }
                    
                    return( 
                        <label> 
                            <br/>
                            { 
                                game.name                           
                            } 
                            <br/>
                            <img src={cover}></img>
                            <br/>
                        </label>
                    )
                    
                }) }
            
            </div>
        )
    }
}

export default GameResults;