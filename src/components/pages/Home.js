import React, { Component } from 'react';
import GetCollection from '../GetCollection';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Home extends Component {
  render() {
    return (
      <Container className="homepage-text">
        This is a website to track your video game collection. It will also be a
        mobile app in the future. This react app is basically a demo for a
        long-term project
        <br />
        <br />
        Select <strong>Search</strong> in the navbar to search for games to add
        to your collection and <strong>Collection</strong> to view the games
        that you have added.
        <br />
        <br />
        Eventually, this page will be used to log into your account when I get
        around to implementing users. For now it will be a todo list.
        <br />
        <br />
        <h3>
          <strong>
            <u>TODO</u>
          </strong>
        </h3>
        <br />
        <strong>Front-End</strong>
        <br />
        add all pages to search results
        <br />
        finish adding custom console data to JSONs
        <br />
        fix bug where game is not added if platform table is empty
        <br />
        find and remove all extrenuous code
        <br />
        create modular components of existing functions in GetResults and
        GetCollection
        <br />
        input validation
        <br />
        make custom bootstrap theme
        <br />
        differentiate console discs and carts / boxes and cases
        <br />
        change complete in box to complete
        <br />
        sort collection sidebar by manufacturer
        <br />
        add date purchased
        <br />
        add cost
        <br />
        add branding
        <br />
        <strike>
          make barebones search results and collection page for testing
        </strike>
        <br />
        <strike>test lambda functions for add/remove capabilities</strike>
        <br />
        <strike>set up Serverless framework</strike>
        <br />
        <strike>make modal popup for selecting completeness</strike>
        <br />
        <strike>
          change collection page from console tabs to sidebar console buttons
        </strike>
        <br />
        <strike>
          make JSON files to populate console buttons on search/collection pages
        </strike>
        <br />
        <strike>
          add ability to search per individual console through sidebar selection
        </strike>
        <br />
        <strike>change game cards to table</strike>
        <br />
        <strike>make icon</strike>
        <br />
        <br />
        <strong>Back-End</strong>
        <br />
        move thegames.db API calls to server
        <br />
        implement pricecharting API
        <br />
        add user log in
        <br />
        <strike>set up Serverless framework</strike>
        <br />
        <strike>set up AWS provider in serverless.yml</strike>
        <br />
        <strike>define platforms dynamodb table in serverless.yml</strike>
        <br />
        <strike>define games dynamodb table in serverless.yml</strike>
        <br />
        <strike>define addGame lambda function in serverless.yml</strike>
        <br />
        <strike>define addPlatform lambda function in serverless.yml</strike>
        <br />
        <strike>define deleteGame lambda function in serverless.yml</strike>
        <br />
        <strike>define getGames lambda function in serverless.yml</strike>
        <br />
        <strike>
          define getPlatformTabs lambda function in serverless.yml
        </strike>
        <br />
        <strike>
          change dynamodb hash and range columns to take advantage of sorting
          when putting items in table
        </strike>
        <br />
        <strike>make env file to remove API keys from code</strike>
        <br />
        <strike>make bucket for production build</strike>
        <br />
        <strike>make cloudfront distribution</strike>
        <br />
        <strike>buy domain name and set up Route 53</strike>
        <br />
        <strike>request SSL certificate and configure</strike>
        <br />
        <strike>make www-less redirect bucket</strike>
        <br />
        <strike>
          fix sorting bug where sequel numbers are confused by uuid numbers
        </strike>
      </Container>
    );
  }
}

export default Home;
