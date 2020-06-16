//Adds games to the server-games table

'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
  var params = {
    TableName: process.env.GAME_TEST_TABLE,
    Item: {
      id: uuid.v1(),
      platform: event.platform,
      name: event.name,
      cover: event.cover,
      completeness: event.completeness,
      developer: event.developer,
    },
  };

  // Call DynamoDB to add the item to the table
  dynamoDb.put(params, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });
};

// https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-game?name=zelda&platform=NES&cover=www.gamecover.com
