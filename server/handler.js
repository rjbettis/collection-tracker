'use strict';

const igdb = require('igdb-api-node').default;

const client = igdb('6d16cbfd74aef6f539c80bae88f9b0d6');

module.exports.endpoint = async (event, context, callback) => {
  
  const response = await client
      .fields('name,cover.image_id,platforms.abbreviation') // same as above
      .limit(5) // limit to 50 results
      .search(event.search) // search for a specific name (search implementations can vary)
      .request('/games'); // execute the query and return a response object
  callback(null, response.data);
};
