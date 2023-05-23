#!/usr/bin/node

const request = require('request');
const url = 'https://swapi.dev/api/people/';

request(url, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const results = JSON.parse(body).results;
    results.forEach((character) => {
      console.log(character.name);
    });
  } else {
    console.error('Error:', error);
  }
});
