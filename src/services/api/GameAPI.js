import axios from "axios";

const getResource = url =>
  axios({
    method: "GET",
    url
  });

const getCharacters = page =>
  axios({
    method: "GET",
    url: `https://swapi.co/api/people/?page=${page}`
  });

export default {
  getResource,
  getCharacters
};
