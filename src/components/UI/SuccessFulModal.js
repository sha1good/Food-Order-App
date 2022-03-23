import React from "react";
import Button from "./Button";
import Card from "./Card";

import classes from "./SuccessFulModal.module.css";

const SuccessFulModal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.removeMessage}></div>
      <Card className={classes.modal}>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.removeMessage}>Ok</Button>
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default SuccessFulModal;
