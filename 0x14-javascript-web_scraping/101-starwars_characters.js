#!/usr/bin/node

const request = require('request');

const filmId = process.argv[2];
const filmUrl = `https://swapi.dev/api/films/${filmId}/`;

request(filmUrl, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const filmData = JSON.parse(body);
    const characters = filmData.characters;

    fetchCharacters(characters);
  } else {
    console.error('Error:', error);
  }
});

function fetchCharacters(characters) {
  let counter = 0;

  function fetchCharacter(url) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const characterData = JSON.parse(body);
        console.log(characterData.name);

        counter++;
        if (counter < characters.length) {
          fetchCharacter(characters[counter]);
        }
      } else {
        console.error('Error:', error);
      }
    });
  }

  if (characters.length > 0) {
    fetchCharacter(characters[counter]);
  }
}
