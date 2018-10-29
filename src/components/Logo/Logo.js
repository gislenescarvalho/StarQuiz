import React, { Component, Fragment } from "react";
import { object } from "prop-types";

import Icon from "../Icons";

class Logo extends Component {
  state = {
    width: this.props.size.lg
  };

  componentWillMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    const { size } = this.props;
    if (window.innerWidth >= 1024)
      return this.setState(() => ({ width: size.lg }));
    if (window.innerWidth >= 768 && window.innerWidth < 1024)
      return this.setState(() => ({ width: size.md }));
    return this.setState(() => ({ width: size.sm }));
  };

  render() {
    return (
      <Fragment>
        <Icon name="DarthVaderBlack" />
      </Fragment>
    );
  }
}

Logo.propTypes = {
  size: object.isRequired
};

export default Logo;
