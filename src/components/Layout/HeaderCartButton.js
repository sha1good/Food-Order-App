import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../store/CartContext";
import AuthContext from "../../store/auth-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  /***
   *
   * The reduce method
   * reduces the array to a single value from left to right.
   * This method leaves the original array unchanged.
   */

  //I only need the bump of the cart to be highlighted when user added the item

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const numberOfCartItems = items.reduce((initialAmount, item) => {
    return initialAmount + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonCart = (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );

  return (
    <div className={classes.header}>
     <li>
     {isLoggedIn && <Link to="/cart">{buttonCart}</Link>}
     </li>
    </div>
  );
};

export default HeaderCartButton;
