//Adds platforms to server-platforms to generate profile tabs

'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
    var params = {
        TableName: process.env.PLATFORM_TABLE,
        Item: {
            'platform' : event.platform,
        },
        ConditionExpression: 'attribute_not_exists(platform)' //puts item if it does not already exist
    };

    // Call DynamoDB to add the item to the table
    dynamoDb.put(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
};

// https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/add-platform?platform=NES