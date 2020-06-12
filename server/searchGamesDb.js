//gets igdb api

'use strict';

const fetch = require('node-fetch');

module.exports.endpoint = async (event, context, callback) => {
  const response = await fetch(
    'https://api.thegamesdb.net/v1.1/Games/ByGameName?apikey=0227114f56e049366ebddde0b89492396a00292eddebf8362a1614b8dbd86f8d&name=' +
      event.search +
      '&filter%5Bplatform%5D=' +
      event.platform +
      '&include=boxart'
  );
  const res = await response.json();

  callback(null, res);
};
