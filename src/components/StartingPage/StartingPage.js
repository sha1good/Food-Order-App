import { useContext} from "react";
import AuthContext from "../../store/auth-context";
import classes from "./StartingPage.module.css";

const StartingPage = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <section className={classes.starting}>
      {!isLoggedIn && (<h1>Welcome to Adejoke Food Canteen </h1>)}
    </section>
  );
};

export default StartingPage;
