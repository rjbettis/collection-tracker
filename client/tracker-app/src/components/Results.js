import React, { Component } from 'react';




class Results extends Component {

    state = {
        added: ""
    };

    addGame(name, cover, gameName) {
        var addGame = `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-data?name=${name}&platform=platform&cover=${cover}`;

        fetch(addGame)
        .then(response => {
            return response.json();
        });

        this.setState({
            added: "Added " + name
        });
    }

    handleLabelClick() {
        
    }
    

    render() {

        
        //const { name, cover } = this.props.searchResults;
        const games2 = this.props.searchResults.map((game, index) => {
            
            const imageUrl = game.cover ? 'https://images.igdb.com/igdb/image/upload/t_cover_small/' + game.cover.image_id + '.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
            var gameName = game["name"];

            console.log(this.state.searchResults);
            return (
                <React.Fragment>
                    <p>
                        <img key={gameName + 'Cover'} src={imageUrl} style={{width:75, height:100}} alt="cover"></img>
                        <button key={gameName} id={gameName} onClick={e => this.addGame(gameName, imageUrl)} >{gameName}</button>
                        
                    </p>
                </React.Fragment>
            )
        });

        return(
            <div>
                <h1>Results</h1>
                <br></br>
                <h2><label>{this.state.added}</label></h2>
                {/* console.log(Object.values(this.props.searchResults)) */}

                { games2 }


            </div>
        );
    }
}


export default Results;