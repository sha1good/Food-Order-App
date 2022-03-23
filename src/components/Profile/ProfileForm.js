import { useRef} from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import Button from "../UI/Button";


const ProfileForm = () => {
 
  const newEmailInputRef = useRef();

  const PASSWORD_RESET ="AIzaSyD-pVzNEVIiUhXh88mhQW2crYl5yX111";

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const newEnteredEmail = newEmailInputRef.current.value;
    const data = {
      requestType: PASSWORD_RESET,
      password: newEnteredEmail,
   
    };

    const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-pVzNEVIiUhXh88mhQW2crYl5yX-uecw";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
       console.log("This  is the response  " + JSON.stringify(res))
      history.push("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          ref={newEmailInputRef}
          required
        />
      </div>
      <div className={classes.actions}>
        <Button type="submit">Reset Password</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
