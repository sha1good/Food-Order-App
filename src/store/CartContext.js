import React, { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart  : () =>{}
});

const cartReducer = (prevState, action) => {
  if (action.type === "ADD_ITEM_CART") {
    const updatedTotalAmount =
      prevState.totalAmount + action.addedItem.amount * action.addedItem.price;
    //Now, check if the item has been added to the cart already, then add new one to the existing one in  the aarray
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.addedItem.id
    );

   //console.log("This is the index of  Existing Cart Item  " + existingCartItemIndex);

    const existingCartItem = prevState.items[existingCartItemIndex];
    console.log("This is existingCartItem " + JSON.stringify(existingCartItem));

    let updatedItems;

    //let updateItem;
    //let updateItem;
    //Now check if the item is part of the array, then update the existing array
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.addedItem.amount,
      };

      //Now copy the old array immutatably to create a new array without changing or editing it
      updatedItems = [...prevState.items];

      // Now update the old item with the new one
      updatedItems[existingCartItemIndex] = updateItem;
    } else {
      //When adding the item for the first time into the array
      // updateItem = { ...action.addedItem };
      updatedItems = prevState.items.concat(action.addedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }


  // if (action.type === "REMOVE_CART_ITEM") {
  //   const existingCartItemIndex = prevState.items.findIndex(
  //     (item) => item.id === action.cartId
  //   );
  //   const existingCartItem = prevState.items[existingCartItemIndex];

  //   const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;

  //   let updatedItems;
  //   if (existingCartItem.amount === 1) {
  //     //if the  remaining item in the cart is 1, we  want to delete the whole cart of that type
  //     updatedItems = prevState.items.filter((item) => item.id !== action.cartId); // new array will  be generated here
  //   } else {
  //     // if  we have total items that is more than one, then, we can delete just part of it
  //     const updatedItem = {
  //       ...existingCartItem,
  //       amount: existingCartItem.amount - 1,
  //     };

  //     updatedItems = [...prevState.items];
  //     updatedItems[existingCartItemIndex] = updatedItem;
  //   }
  //   return {
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount,
  //   };
  // }

  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.cartId
    );

    const existingCartItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      //if the  remaining item in the cart is 1, we want to delete the whole cart of that type
      updatedItems = prevState.items.filter(
        (item) => item.id !== action.cartId
      ); // new array will  be generated here
    } else {
      // if  we have total items that is more than one, then, we can delete just part of it

      const updatedItem = {
        ...existingCartItem,
        amount:  existingCartItem.amount - 1,
      };
      //Now copy the old array immutatably to create a new array without changing or editing it
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }


  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD_ITEM_CART", addedItem: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE_CART_ITEM", cartId: id });
  };

   const clearCartHandler = () =>{
     dispatchCartState({type : "CLEAR"})
   }

  const contextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart : clearCartHandler
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
