import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GetCollection from './GetCollection';
import 'react-tabs/style/react-tabs.css';

export class CollectionTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: []
    };
  }

  async componentDidMount() {
    const response = await fetch(
      'https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-platform-tabs'
    );
    const res = await response.json();
    this.setState({ platform: res });
  }

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            {this.state.platform.map(plat => (
              <Tab key={plat.platform}>{plat.platform}</Tab>
            ))}
          </TabList>
          {this.state.platform.map(plat => (
            <TabPanel>
              <GetCollection platform={plat.platform} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default CollectionTabs;
