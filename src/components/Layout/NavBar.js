import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./NavBar.module.css";
const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className={classes.header}>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to="/meal">Available Meals</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
