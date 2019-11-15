import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GameResults from './GameResults';
import 'react-tabs/style/react-tabs.css';

export class Collection extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            platform: []
        };
      }
    
    componentDidMount() {
        fetch('https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-platform-tabs')
        .then(response => {
            return response.json();
        })
        .then(res => this.setState( { platform:res }));

    }
    
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        { 
                            this.state.platform.map(plat => 
                                <Tab>{ plat.platform }</Tab>) 
                        }
                    </TabList>
                    { 
                            this.state.platform.map(plat => 
                                <TabPanel>
                                    <GameResults platform={plat.platform}/>
                                </TabPanel>) 
                        }

                    
                </Tabs>
            </div>
        )
    }
}

export default Collection;