#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

const filmUrls = {
  1: 'https://swapi.dev/api/films/1/',
  2: 'https://swapi.dev/api/films/2/',
  3: 'https://swapi.dev/api/films/3/',
  4: 'https://swapi.dev/api/films/4/',
  5: 'https://swapi.dev/api/films/5/',
  6: 'https://swapi.dev/api/films/6/',
};

const filmUrl = filmUrls[movieId];

if (filmUrl) {
  request(filmUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const filmData = JSON.parse(body);
      const characters = filmData.characters;

      fetchCharacterNames(characters);
    } else {
      console.error('Error:', error);
    }
  });
} else {
  console.error('Invalid movie ID');
}

function fetchCharacterNames(characters) {
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
