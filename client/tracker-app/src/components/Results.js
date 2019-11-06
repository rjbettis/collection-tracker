import React, { Component } from 'react';

class Results extends Component {

    
    render() {

        const games2 = this.props.searchResults.map((game, index) => {
            const imageUrl = 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg';
            //const platform = game.platforms[0].abbreviation;
            var platformArr = game.platforms;

            console.log(platformArr)
            return (
                <React.Fragment>
                    <p>
                        <img key={game["name"] + 'Cover'} src={imageUrl} alt="cover"></img>
                        <button key={game["name"]}>{game["name"]}</button>
                    </p>
                    
                    
                </React.Fragment>
            )
        });        

        return(
            <div>
                <h1>Results</h1>
                {console.log(Object.values(this.props.searchResults))}

                { games2 }

            </div>
        );
    }
}


export default Results;