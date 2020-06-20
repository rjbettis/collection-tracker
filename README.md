[React application to track your video game collection](https://game-collection.org)

## Project Description

This is a full stack app with a React frontend and Serverless Node.js backend on AWS. It has two main functionalities: 1) Searching for video games to add to your collection. 2) Viewing your collection database.

### Searching for games

When a game is searched for the react app makes an API call to thegames.db to get the games that will be displayed to the user. You can search the
entire database of thegames.db or you can filter by console. The list of games is rendered in a table with the cover, title, console platform and release date. When a game is selected
by the user it makes an API call to the backend which adds the game and platform (if new) to dynamodb tables.

### Browsing collection

When the user views their collection the react app automatically makes a call to the backend to read the tables from dynamodb to populate the console list and to render the games from
the selected console. The user can also remove games from their collection which will make another call to the backend to delete the game and platform from the dynamodb tables.

### Features to be added

I will be adding price capabilities to the app that will be retrieved from the pricecharting API. Right now there is only one collection but it will support user accounts which will
have their own dynamo tables. The plan to use dynamodb might change once I look deeper into how it will all work.

### Technologies Utilized

1. Create React App
2. React Router
3. React Bootstrap front-end framework
4. Node.js
5. Serverless Application Framework
6. AWS API Gateway
7. AWS Lambda
8. AWS DynamoDB
9. AWS S3
10. AWS CloudFront
11. AWS Route 53

## Todo

### Front-end

- [ ] add all pages to search results
- [ ] finish adding custom console data to JSONs
- [ ] fix bug where game is not added if platform table is empty
- [ ] find and remove all extrenuous code
- [ ] create modular components of existing functions in GetResults and GetCollection
- [ ] input validation
- [ ] make custom bootstrap theme
- [ ] differentiate console discs and carts / boxes and cases
- [ ] change complete in box to complete
- [ ] sort collection sidebar by manufacturer
- [ ] add date purchased
- [ ] add cost
- [ ] add branding

- [x] make barebones search results and collection page for testing
- [x] test lambda functions for add/remove capabilities
- [x] set up Serverless framework
- [x] make modal popup for selecting completeness
- [x] change collection page from console tabs to sidebar console buttons
- [x] make JSON files to populate console buttons on search/collection pages
- [x] add ability to search per individual console through sidebar selection
- [x] change game cards to table
- [x] make icon

### Back-end

- [ ] move thegames.db API calls to server
- [ ] implement pricecharting API
- [ ] add user log in
- [x] set up Serverless framework
- [x] set up AWS provider in serverless.yml
- [x] define platforms dynamodb table in serverless.yml
- [x] define games dynamodb table in serverless.yml
- [x] define addGame lambda function in serverless.yml
- [x] define addPlatform lambda function in serverless.yml
- [x] define deleteGame lambda function in serverless.yml
- [x] define getGames lambda function in serverless.yml
- [x] define getPlatformTabs lambda function in serverless.yml
- [x] change dynamodb hash and range columns to take advantage of sorting when putting items in table
- [x] make env file to remove API keys from code
- [x] make bucket for production build
- [x] make cloudfront distribution
- [x] buy domain name and set up Route 53
- [x] request SSL certificate and configure
- [x] make www-less redirect bucket
- [x] fix sorting bug where sequel numbers are confused by uuid numbers
