//Deletes games to the server-games table

'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
    var params = {
        TableName: process.env.GAME_TABLE,
        Key: {
            'id' : event.id,
            'platform' : event.platform
        },
    };
    

    // Call DynamoDB to add the item to the table
    dynamoDb.delete(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
};

// https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/delete-game?id=&platform=