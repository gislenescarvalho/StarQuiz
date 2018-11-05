import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "../../pages/Home/Home";
import Quiz from "../../components/Quiz";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Quiz} />
          <Route exact path="/game/:hash" component={Quiz} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
