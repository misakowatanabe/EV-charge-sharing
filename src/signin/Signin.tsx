import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LockIcon from "../icon/LockIcon";
import SigninEmail from "./SigninEmail";
import SigninPassword from "./SigninPassword";
import Button1 from "../buttons/Button1";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const auth = getAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        var errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          setResponseData("User not found. Please check your email adress.");
        } else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          setResponseData("Password seems wrong, please check it again.");
        } else if (
          errorMessage === "Firebase: Error (auth/network-request-failed)."
        ) {
          setResponseData(
            "Something went wrong with network. Please check your internet connection."
          );
        } else {
          setResponseData(`${errorMessage} Please contact _______.`);
        }
      });
  }

  return (
    <div>
      <div className="login-title">Sign in</div>
      <LockIcon />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="register-error-message">{responseData}</div>
        <SigninEmail email={email} setEmail={setEmail} />
        <SigninPassword password={password} setPassword={setPassword} />
        <div className="login-button">
          <Button1 data-type="submit" disabled={!validateForm()}>
            Signin
          </Button1>
        </div>
        <NavLink to={`/signup`}>
          <div className="toggle-signin-signup">
            Don't have an account? Sign up
          </div>
        </NavLink>
      </form>
    </div>
  );
}
