import React from "react";
import { func, bool } from "prop-types";

import Icon from "../Icons";

import Container from "./Container";
import styles from "./styles.scss";

const Pagination = props => {
  const { goToNextPage, goToPreviousPage, hasNext, hasPrevious } = props;

  return (
    <div className={styles.pagination}>
      {hasPrevious && (
        <button className={styles.buttonPagination} onClick={goToPreviousPage}>
          <Icon name="ChevronLeft" width={32} height={32} /> Anterior
        </button>
      )}
      {hasNext && (
        <button className={styles.buttonPagination} onClick={goToNextPage}>
          Próximo <Icon name="ChevronRight" width={32} height={32} />
        </button>
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
