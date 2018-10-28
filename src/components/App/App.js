import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "../../pages/Home/Home";
import Game from "../../pages/Game/Game";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
