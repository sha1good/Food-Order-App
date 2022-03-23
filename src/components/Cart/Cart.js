import { useState, useContext, Fragment } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import AuthContext from "../../store/auth-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubit] = useState(false);

  const cartCtx = useContext(CartContext);
  const authCtx= useContext(AuthContext);

  console.log("this is the Items array " + JSON.stringify(cartCtx.items));

  const totalAmount = `#${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://my-react-https-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubit(true);
    cartCtx.clearCart();
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {authCtx.isLoggedIn && isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {authCtx.isLoggedIn && !isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingOrderContent = <p>Sending Order Data ...</p>;
  const didSubmitOrderContent = (
    <Fragment>
      <p>Successfully Sent the Order !</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {authCtx.isLoggedIn && !isSubmitting && !didSubmit && cartModalContent}
      {authCtx.isLoggedIn && isSubmitting && isSubmittingOrderContent}
      {authCtx.isLoggedIn && !isSubmitting && didSubmit && didSubmitOrderContent}
    </Modal>
  );
};

export default Cart;
