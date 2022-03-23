import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthLogout.module.css";
const AuthLogout = () => {
  const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div className={classes.header}>
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      )}
    </div>
  );
};

export default AuthLogout;
