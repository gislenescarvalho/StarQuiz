import React from "react";
import Icons from "./Icons";

const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
};

export default Icon;
