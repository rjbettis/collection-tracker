import React, { Component } from 'react'
import SearchDB from './../SearchDB';

export class Profile extends Component {
    
    render() {
        return (
            <div>
                <h1>Search</h1>
                <p>Search for games to add to your collection.</p>
                <br/>
                <SearchDB />
            </div>
        )
    }
}

export default Profile;