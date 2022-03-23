import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../images/meals.jpg";
import AuthContext from "../../store/auth-context";
import NavBar from "./NavBar";
import AuthLogin from "./AuthLogin";
import AuthLogout from "./AuthLogout";

//import MainNavigation from "./MainNavigation";
const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>App Logo</h1>
        {!isLoggedIn && <AuthLogin />}
        {isLoggedIn && <NavBar />}
        {isLoggedIn && <HeaderCartButton onClick={props.showCart} />}
        {isLoggedIn && <AuthLogout />}
      </header>
       {isLoggedIn && (
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
     )}
    </React.Fragment>
  );
};

export default Header;
