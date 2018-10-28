import React, { Component } from "react";
import { func, bool } from "prop-types";

class Container extends Component {
  render() {
    return <Component {...this.props} {...this.state} />;
  }
}

Container.propTypes = {
  goToNextPage: func.isRequired, // go to next page
  goToPreviousPage: func.isRequired, // go to previous page
  hasNext: bool.isRequired, // Has next page
  hasPrevious: bool.isRequired // Has previous page
};

export default Container;
