import React from "react";
import Icon from "../Icons";
import styles from "./styles.css";
import ReactModal from "react-modal";

const Loading = props => (
  <ReactModal
    isOpen={props.isOpen}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <Icon name="Loading" className={styles.loader} />
  </ReactModal>
);

export default Loading;
