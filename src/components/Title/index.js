import React from "react";
import classnames from "classnames";
import styles from "./Title.module.css";

const Title = ({ children, className, style }) => {
  const cls = classnames(
    `fw4 f24 f20-m f36-l lh-copy tc ma0 mb32 ml20 ${styles.title}`,
    className
  );
  return (
    <h2 className={cls} style={style}>
      {children}
    </h2>
  );
};

export default Title;
