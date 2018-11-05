import React from "react";
import moment from "moment";
import { number } from "prop-types";
import Images from "../../assets/images";
import { LocalStorageHelpers } from "../../helpers";
import { GameAPI } from "../../services/api";

const QuizContainer = Component =>
  class extends React.Component {
    static propTypes = {
      countdown: number, // Number in seconds of countdown before game begins
      itensPerPage: number, // How many items to display on each page
      pointsForFullAnswer: number, // Points for a correct answer without tips
      timeLimit: number // Number in seconds of available time to answer the Quiz
    };

    static defaultProps = {
      countdown: 3,
      itensPerPage: 10,
      pointsForFullAnswer: 10,
      timeLimit: 120
    };

    constructor(props) {
      super(props);

      this.state = {
        activePage: 1,
        answers: [],
        apiPeople: [], // All people from API.
        availableAPIPages: [], // Pages available on the API. Ex: [1, 2, 3, 4, 5, 6, 7, 8, 9].
        dateTimeEnded: "", // DateTime that the game was concluded.
        dateTimeLimit: "", // DateTime limit to finish the game (dateTimeStart + timeLimit).
        dateTimeStart: "", // DateTime when the game started.
        email: "", // Player email.
        hash: "", // Unique hash
        isGameFinished: false, // Game has been finished and player has put it's name and email.
        isGameReady: false, // Game is ready to start.
        name: "", // Player name.
        pages: [], // Pages to show at the game. Each page is an attribute as the page and the value as an array that expect to have {props.itensPerPage} length.
        play: false,
        score: null // Player final score.
      };

      this.interval = setInterval(this.gameCounter, 1000);
    }

    componentDidMount() {
      const {
        match: { params }
      } = this.props;

      let hash = params.hash;

      if (!hash) {
        hash = this.createHash();
      }

      this.setState(
        {
          hash
        },
        () => {
          this.props.history.push(`/game/${hash}`);

          this.loadInitialGameData();
        }
      );
    }

    computeGameScore = () => {
      const { answers, apiPeople } = this.state;
      const { pointsForFullAnswer } = this.props;

      const computeMatchScore = (value1, value2) => {
        let matchScore = 0;

        value1 = value1.toLowerCase().replace(/\s/g, "");
        value2 = value2.toLowerCase().replace(/\s/g, "");

        if (value1 === value2) {
          matchScore = 100;
        }

        return matchScore;
      };

      const computeAnswerScore = (
        matchScore,
        fullScorePoints,
        hasUsedHint = false
      ) => {
        if (matchScore < 1) return matchScore;

        let answerScore = (fullScorePoints / matchScore) * 100;

        return hasUsedHint ? answerScore / 2 : answerScore;
      };

      let gameScore = 0;

      if (apiPeople.length === 0) {
        this.loadInitialGameData();
      }

      if (answers) {
        answers.forEach(answer => {
          const expected = apiPeople.find(people => people.url === answer.url)
            .name;
          const actual = answer.text;

          const matchScore = computeMatchScore(expected, actual);
          const answerScore = computeAnswerScore(
            matchScore,
            pointsForFullAnswer,
            answer.hasUsedHint
          );

          gameScore += answerScore;
        });
      }

      return gameScore;
    };

    createPages = (peoples, gameHash) => {
      const { itensPerPage } = this.props;
      const { getResource } = GameAPI;
      const { getGame, setOrUpdateGame } = LocalStorageHelpers;

      peoples = peoples.sort((a, b) => 0.5 - Math.random());

      let game = getGame(gameHash);
      let pages = {};

      if (game) {
        if (!this.isExpired()) {
          Object.keys(game.pages).forEach(pageNumber => {
            const page = game.pages[pageNumber].map(({ url }) =>
              peoples.find(people => people.url === url)
            );

            pages[pageNumber] = page;
          });

          this.setState(
            {
              pages
            },
            () => {
              this.loadPageInfo(this.state.activePage);
            }
          );
        } else {
          this.gameCounter();
        }
      } else {
        game = {
          email: "",
          hash: gameHash,
          isGameFinished: false,
          name: "",
          pages: {},
          score: null
        };

        let actualPage = 1;

        peoples.forEach(people => {
          if (!game.pages[actualPage]) {
            game.pages[actualPage] = [];
          }

          if (!pages[actualPage]) {
            pages[actualPage] = [];
          }

          if (pages[actualPage].length === itensPerPage) {
            actualPage++;

            pages[actualPage] = [];
            game.pages[actualPage] = [];
          }

          const peopleToLocalStorage = {
            url: people.url
          };

          pages[actualPage].push(people);
          game.pages[actualPage].push(peopleToLocalStorage);
        });

        setOrUpdateGame(game);

        this.setState(
          {
            pages
          },
          () => {
            this.loadPageInfo(this.state.activePage);
          }
        );
      }
    };

    closeHintModal = id => {
      const { answers, hash } = this.state;
      const { setGameData } = LocalStorageHelpers;

      const answerIndex = answers.findIndex(a => a.url === id);
      const answer = answers[answerIndex];

      answer.openedModal = false;
      answers[answerIndex] = answer;

      this.setState(
        {
          answers
        },
        () => {
          setGameData(hash, "answers", answers);
        }
      );
    };

    createHash = () => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let i;
      for (i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    };

    gameCounter = () => {
      const { hash, score } = this.state;
      const { setGameData } = LocalStorageHelpers;

      if (this.isExpired()) {
        clearInterval(this.interval);

        let calculateScore = score;

        if (score === null) {
          calculateScore = this.computeGameScore();
        }

        this.setState(
          {
            dateTimeEnded: new Date(),
            score: calculateScore
          },
          () => {
            setGameData(hash, "dateTimeEnded", this.state.dateTimeEnded);
            setGameData(hash, "score", calculateScore);
          }
        );
      }
    };

    getItensFromPage = page => {
      const { pages } = this.state;

      return pages[page];
    };

    getPages = () => {
      const pages = Object.keys(this.state.pages)
        .map(page => parseInt(page))
        .sort();

      return pages;
    };
    goToNextPage = () => {
      const { activePage } = this.state;

      if (this.hasNextPage()) {
        this.setState(
          {
            activePage: activePage + 1
          },
          () => {
            this.loadPageInfo(this.state.activePage + 1);
          }
        );
      }
    };

    goToPreviousPage = () => {
      const { activePage } = this.state;

      if (this.hasPreviousPage()) {
        this.setState(
          {
            activePage: activePage - 1
          },
          () => {
            this.loadPageInfo(this.state.activePage - 1);
          }
        );
      }
    };

    handleItemGuessInputChange = (event, id) => {
      const { answers, hash } = this.state;
      const { setGameData } = LocalStorageHelpers;

      const answerIndex = answers.findIndex(a => a.url === id);
      let answer;

      if (answerIndex > -1) {
        answer = answers[answerIndex];
        answer.text = event.target.value;

        answers[answerIndex] = answer;
      } else {
        answer = {
          url: id,
          text: event.target.value
        };

        answers.push(answer);
      }

      this.setState(
        {
          answers
        },
        () => {
          setGameData(hash, "answers", this.state.answers);
        }
      );
    };

    hasNextPage = () => {
      const { activePage } = this.state;

      const pages = this.getPages();
      const index = pages.findIndex(p => p === activePage);

      const remainingPages = pages.splice(index + 1, pages.length);

      return remainingPages.length > 0;
    };

    hasPreviousPage = () => {
      const { activePage } = this.state;

      const pages = this.getPages();
      const index = pages.findIndex(p => p === activePage);

      pages.splice(index, pages.length);

      return pages.length > 0;
    };

    isExpired = () => {
      const { dateTimeLimit } = this.state;

      const secondsRemaining = moment().diff(dateTimeLimit, "seconds") * -1;

      return secondsRemaining < 1;
    };

    loadDetailsCharacter = characterId => {
      const { activePage, pages } = this.state;
      const { getResource } = GameAPI;

      let page = pages[activePage];

      let characterIndex = page.findIndex(c => c.url === characterId);
      let character = page[characterIndex];

      let films = character.films;
      let homeworld = character.homeworld;
      let species = character.species;
      let starships = character.starships;
      let vehicles = character.vehicles;

      if (!character.isHomeworldLoaded) {
        character.homeworld = {};

        getResource(homeworld)
          .then(response => {
            character.homeworld = response.data;
            character.isHomeworldLoaded = true;

            page = pages[activePage];
            page[characterIndex] = character;
            pages[activePage] = page;

            this.setState({
              pages
            });
          })
          .catch(response => {
            console.log("error", response);
          });
      }

      if (!character.isFilmsLoaded && films.length > 0) {
        character.films = [];

        films.forEach((filmUrl, indexFilms) => {
          getResource(filmUrl)
            .then(response => {
              character.films.push(response.data);

              if (indexFilms + 1 === films.length) {
                character.isFilmsLoaded = true;
                page = pages[activePage];
                page[characterIndex] = character;
                pages[activePage] = page;

                this.setState({
                  pages
                });
              }
            })
            .catch(response => {
              console.log("error", response);
            });
        });
      }

      if (!character.isSpeciesLoaded && species.length > 0) {
        character.species = [];

        species.forEach((speciesUrl, indexSpecies) => {
          getResource(speciesUrl)
            .then(response => {
              character.species.push(response.data);

              if (indexSpecies + 1 === species.length) {
                character.isSpeciesLoaded = true;
                page = pages[activePage];
                page[characterIndex] = character;
                pages[activePage] = page;

                this.setState({
                  pages
                });
              }
            })
            .catch(response => {
              console.log("error", response);
            });
        });
      }

      if (!character.isStarshipsLoaded && starships.length > 0) {
        character.starships = [];

        starships.forEach((starshipsUrl, indexStarships) => {
          getResource(starshipsUrl)
            .then(response => {
              character.starships.push(response.data);

              if (indexStarships + 1 === starships.length) {
                character.isStarshipsLoaded = true;
                page = pages[activePage];
                page[characterIndex] = character;
                pages[activePage] = page;

                this.setState({
                  pages
                });
              }
            })
            .catch(response => {
              console.log("error", response);
            });
        });
      }

      if (!character.isVehiclesLoaded && vehicles.length > 0) {
        character.vehicles = [];

        vehicles.forEach((vehiclesUrl, indexVehicles) => {
          getResource(vehiclesUrl)
            .then(response => {
              character.vehicles.push(response.data);

              if (indexVehicles + 1 === vehicles.length) {
                character.isVehiclesLoaded = true;
                page = pages[activePage];
                page[characterIndex] = character;
                pages[activePage] = page;

                this.setState({
                  pages
                });
              }
            })
            .catch(response => {
              console.log("error", response);
            });
        });
      }
    };

    loadInitialGameData = () => {
      const { hash } = this.state;
      const { getResource } = GameAPI;
      const { getGame } = LocalStorageHelpers;

      let game = getGame(hash);

      const loadGame = () => {
        const loadPeoplesPage = url => {
          getResource(url)
            .then(response => {
              const { data } = response;
              const { next, results } = data;

              const peoples = this.state.apiPeople.concat(results);

              this.setState({
                apiPeople: peoples
              });

              if (next) {
                loadPeoplesPage(next);
              } else {
                let allPeople = this.state.apiPeople;

                this.createPages(allPeople, hash);
              }
            })
            .catch(response => {
              console.log("error", response);
            });
        };

        loadPeoplesPage("https://swapi.co/api/people/?page=1");
      };

      if (game) {
        this.setState(
          {
            answers: game.answers ? game.answers : [],
            dateTimeEnded: new Date(game.dateTimeEnded),
            dateTimeLimit: new Date(game.dateTimeLimit),
            dateTimeStart: new Date(game.dateTimeStart),
            email: game.email,
            isGameFinished: game.isGameFinished,
            name: game.name,
            score: game.score
          },
          () => {
            if (!this.isExpired()) {
              loadGame();
            }
          }
        );
      } else {
        loadGame();
      }
    };

    loadPageInfo = pageNumber => {
      const { pages } = this.state;

      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      if (pages[pageNumber]) {
        pages[pageNumber].forEach((character, indexCharacter) => {
          if (!character.imageUrl) {
            const url = character.url;
            const split = url.split("/");
            const id = split[split.length - 2];

            const itemImages = Images[id];

            character.imageUrl =
              itemImages[getRandomInt(0, itemImages.length - 1)];

            pages[pageNumber][indexCharacter] = character;

            if (indexCharacter + 1 === pages[pageNumber].length) {
              this.setState({
                isGameReady: true,
                pages
              });
            }
          }
        });
      }

      if (this.hasNextPage() && this.state.activePage + 1 === pageNumber + 1) {
        this.loadPageInfo(this.state.activePage + 1);
      }

      if (
        this.hasPreviousPage() &&
        this.state.activePage - 1 === pageNumber - 1
      ) {
        this.loadPageInfo(this.state.activePage - 1);
      }
    };

    openHintModal = id => {
      const { answers, hash } = this.state;
      const { setGameData } = LocalStorageHelpers;

      this.loadDetailsCharacter(id);

      const answerIndex = answers.findIndex(a => a.url === id);
      let answer;

      if (answerIndex > -1) {
        answer = answers[answerIndex];
        answer.openedModal = true;
        answer.hasUsedHint = true;

        answers[answerIndex] = answer;
      } else {
        answer = {
          url: id,
          openedModal: true,
          hasUsedHint: true
        };

        answers.push(answer);
      }

      this.setState(
        {
          answers
        },
        () => {
          setGameData(hash, "answers", answers);
        }
      );
    };

    saveGameData = data => {
      const { hash } = this.state;
      const { setGameData } = LocalStorageHelpers;

      Object.keys(data).forEach(attribute => {
        const value = data[attribute];

        setGameData(hash, attribute, value);

        this.setState({
          [attribute]: value
        });
      });

      setGameData(hash, "isGameFinished", true);

      this.setState({
        isGameFinished: true
      });
    };

    startGame = () => {
      const { dateTimeStart, hash, play } = this.state;
      const { timeLimit } = this.props;
      const { setGameData } = LocalStorageHelpers;

      const addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60000);
      };

      if (!play) {
        this.setState({
          play: true
        });
      }

      if (!dateTimeStart) {
        this.setState(
          {
            dateTimeLimit: addMinutes(new Date(), timeLimit / 60),
            dateTimeStart: new Date()
          },
          () => {
            setGameData(hash, "dateTimeLimit", this.state.dateTimeLimit);
            setGameData(hash, "dateTimeStart", this.state.dateTimeStart);
          }
        );
      }
    };

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          closeHintModal={this.closeHintModal}
          goToNextPage={this.goToNextPage}
          goToPreviousPage={this.goToPreviousPage}
          handleItemGuessInputChange={this.handleItemGuessInputChange}
          hasNext={this.hasNextPage()}
          hasPrevious={this.hasPreviousPage()}
          isExpired={this.isExpired()}
          itens={this.getItensFromPage(this.state.activePage)}
          loadDetailsCharacter={this.loadDetailsCharacter}
          openHintModal={this.openHintModal}
          saveGameData={this.saveGameData}
          startGame={this.startGame}
        />
      );
    }
  };

export default QuizContainer;
