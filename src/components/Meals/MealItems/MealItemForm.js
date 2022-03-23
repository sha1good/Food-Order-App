import React, { useState, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    const enteredNumberAmount = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredNumberAmount < 1 ||
      enteredNumberAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCard(enteredNumberAmount);
  };

  const input = {
    id :"amount__" + props.id,
    type: "number",
    min: "1",
    max: "5",
    defaultValue: "1",
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input ref={amountInputRef} label="Amount" input={input} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount( 1-5) </p>}
    </form>
  );
};

export default MealItemForm;
