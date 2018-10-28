import axios from "axios";

const URL = "https://swapi.co/api/people/";

const getResource = url =>
  axios({
    method: "GET",
    url
  });

const getCharacters = numberPage =>
  axios({
    method: "GET",
    url: `${URL}?page=${numberPage}`
  });

export default {
  getResource,
  getCharacters
};
