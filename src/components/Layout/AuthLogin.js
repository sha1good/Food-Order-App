import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthLogin.module.css";
const AuthLogin = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.header}>
      {!authCtx.isLoggedIn && (
        <li>
          <Link to="/auth">Login</Link>
        </li>
      )}
    </div>
  );
};

export default AuthLogin;
