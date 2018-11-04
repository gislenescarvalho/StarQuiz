import axios from "axios";

const URL = process.env.BASE_URL;

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
