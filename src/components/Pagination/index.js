import React from "react";
import { func, bool } from "prop-types";

import Icon from "../Icons";

import Container from "./Container";
import styles from "./Pagination.module.css";

const Pagination = props => {
  const { goToNextPage, goToPreviousPage, hasNext, hasPrevious } = props;

  return (
    <div className={styles.pagination}>
      {hasPrevious && (
        <Icon
          name="ChevronLeft"
          width={25}
          height={25}
          onClick={goToPreviousPage}
          className="pointer"
        />
      )}
      {hasNext && (
        <Icon
          name="ChevronRight"
          width={25}
          height={25}
          onClick={goToNextPage}
          className="pointer"
        />
      )}
    </div>
  );
};

Pagination.propTypes = {
  goToNextPage: func.isRequired, // Function to go to next page
  goToPreviousPage: func.isRequired, // Function to go to previous page
  hasNext: bool.isRequired, // Has next page
  hasPrevious: bool.isRequired // Has previous page
};

export default Container(Pagination);
