'use strict';

//const uuid = require('uuid');
const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {

    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            'id' : uuid.v1(),
            'platform' : 'platform',
            'name' : 'name',
            'cover' : 'cover',
        },
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
