import _ from "lodash";

const GAMESNAME = "QUIZ";

const getGames = () => {
  return JSON.parse(localStorage.getItem(GAMESNAME)) || [];
};

const deleteGame = gameHash => {
  const games = getGames();

  games = _.filter(games, game => game.hash != gameHash);

  localStorage.setItem(GAMESNAME, JSON.stringify(games));
};

const getFinishedGames = () => {
  const games = getGames();

  return _.filter(games, game => game.isGameFinished && game.score != null);
};

const getGame = gameHash => {
  const games = getGames();

  const game = _.find(games, game => game.hash === gameHash);
  return game;
};

const getLastPendingGame = () => {
  const pendingGames = getPendingGames();

  return pendingGames[pendingGames.length - 1];
};

const getPendingGames = () => {
  const games = getGames();

  return _.filter(
    games,
    game => !game.isGameFinished && game.dateTimeStart && game.dateTimeLimit
  );
};

const setAnswer = (gameHash, answer) => {
  const games = getGames();
  const gameIndex = _.findIndex(games, game => game.hash === gameHash);

  const game = games[gameIndex];

  const answerIndex = _.findIndex(
    game.answers,
    gameAnswer => gameAnswer.id === answer.id
  );

  if (!answerIndex) {
    game.answers.push(answer);
  } else {
    game.answers[answerIndex] = answer;
  }

  games[gameIndex] = game;

  localStorage.setItem(GAMESNAME, JSON.stringify(games));
};

const setGameData = (gameHash, attribute, value) => {
  const games = getGames();

  const gameIndex = _.findIndex(games, game => game.hash === gameHash);
  const game = games[gameIndex];

  game[attribute] = value;
  games[gameIndex] = game;

  localStorage.setItem(GAMESNAME, JSON.stringify(games));
};

const setOrUpdateGame = game => {
  const games = getGames();

  const localStorageGameIndex = _.findIndex(
    games,
    game => game.hash === gameHash
  );

  if (localStorageGameIndex) {
    games[localStorageGameIndex] = game;
  } else {
    games.push(game);
  }

  localStorage.setItem(GAMESNAME, JSON.stringify(games));
};

export default {
  deleteGame,
  getFinishedGames,
  getGame,
  getLastPendingGame,
  getPendingGames,
  setAnswer,
  setGameData,
  setOrUpdateGame
};
