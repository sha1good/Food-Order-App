import { Link } from "react-router-dom";
import Header from "./Header";

// import HeaderPage from "../../Pages/HeaderPage";

import classes from "./MainNavigation.module.css";
const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <Header showCart={props.showCart} />
      </Link>
    </header>
  );
};

export default MainNavigation;
