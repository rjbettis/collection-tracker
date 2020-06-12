'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

module.exports.endpoint = (event, context, callback) => {
  // Initialize
  const oauth = OAuth({
    consumer: {
      key: 'UeP2OmbsH7Tlmh9MmGDoefnW2',
      secret: 'UqdSDdB3xODGvtYuk4UZkTQ6JOuKbBkKAU3XcyFr82eyZYTR8p'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    }
  });

  const request_data = {
    url:
      'https://api.twitter.com/1.1/statuses/home_timeline.json?tweet_mode=extended',
    method: 'GET'
  };

  // Note: The token is optional for some requests
  const token = {
    key: '45988078-Ke5MvtpcnUkbA1fdLk96fe7tlp9VtVxVeV9WnwJyA',
    secret: 'K0JRH3PD8x1rBm0PhL3ALVFa0C9wH7M0J6OhzrA0G0Rs5'
  };

  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    },
    function(error, response, body) {
      callback(null, body);
    }
  );
};

/*


*/
