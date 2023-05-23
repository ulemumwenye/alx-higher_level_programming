#!/usr/bin/node

const request = require('request');
const baseUrl = 'https://swapi.dev/api/people/';
let allCharacters = [];

function fetchCharacters(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const results = data.results;
      allCharacters = allCharacters.concat(results);
      if (data.next) {
        fetchCharacters(data.next);
      } else {
        printCharacters();
      }
    } else {
      console.error('Error:', error);
    }
  });
}

function printCharacters() {
  allCharacters.forEach((character) => {
    console.log(character.name);
  });
}

fetchCharacters(baseUrl);
