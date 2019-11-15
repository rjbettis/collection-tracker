import React, { Component } from 'react'
import Collection from './../Collection';

export class Profile extends Component {
    
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <p>Games filtered by platform</p>
                <br/>
                <Collection />
            </div>
        )
    }
}

export default Profile;