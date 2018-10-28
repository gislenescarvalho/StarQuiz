import React, { Component } from "react";
import { object, string, number } from "prop-types";
import Logo from "../Logo/Logo";
import Title from "../Title";
import CountDown from "../CountDown/CountDown";

class Header extends Component {
  render() {
    const { sizeLogo, title, time } = this.props;
    return (
      <div className="Grid">
        <div className="Grid-cell u-sm-size7of12 u-md-size8of12 u-lg-size8of12">
          <div className="Grid u-flexAlignItemsCenter">
            <Logo size={sizeLogo} />
            <Title> {title} </Title>
          </div>
        </div>
        <div className="Grid-cell u-sm-size5of12 u-md-size4of12 u-lg-size4of12 u-flex u-flexJustifyEnd">
          <CountDown time={time} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  sizeLogo: object,
  title: string,
  time: number
};

Header.defaultProps = {
  sizeLogo: {},
  title: "",
  time: 0
};

export default Header;
