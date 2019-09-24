'use strict';

module.exports.endpoint = (event, context, callback) => {
  
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      details:[1,2,3],
    }),
  };

  callback(null, response);
};