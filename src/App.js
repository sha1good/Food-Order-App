import React, { useState, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import MealPage from "./Pages/MealPage";
import CartContextProvider from "./store/CartContext";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import AuthContext from "./store/auth-context";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const authCtx = useContext(AuthContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHnadler = () => {
    setCartIsShown(false);
  };
  return (
    <CartContextProvider>
      <Layout showCart={showCartHandler}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage onClose={hideCartHnadler}/>
            </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Route path="/profile">
              <ProfilePage />
            </Route>
          )}
          {authCtx.isLoggedIn && cartIsShown && (
            <Route path="/cart">
              <CartPage onClose={hideCartHnadler} />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/meal">
              <MealPage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </CartContextProvider>
  );
}

export default App;
