import React, { useContext } from "react";
import classes from "./MealsItem.module.css";
import MealItemForm from "./MealItemForm";
import { CartContext } from "../../../store/CartContext";

const MealsItem = (props) => {
  const cartContext = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{`#${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCard={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
