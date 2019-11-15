//Gets list of games from specific platform

'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
    var params = {
        TableName : process.env.GAME_TABLE,
        FilterExpression: 'platform = :platform',
        ExpressionAttributeValues: { 
            ":platform" : event.platform,
         }
    };

    // Call DynamoDB to add the item to the table
    dynamoDb.scan(params, function(err, data){
        if(err){
            callback(err, null);
        }else{
            callback(null, data);
       }
    });
};

// https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-games?platform=NES