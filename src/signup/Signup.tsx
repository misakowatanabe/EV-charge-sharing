import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import SignupName from "./SignupName";
import SignupNumberPlate from "./SignupNumberPlate";
import SignupEmail from "./SignupEmail";
import SignupPassword from "./SignupPassword";
import Button1 from "../reusableComponents/Button1";
import LockIcon from "../icon/LockIcon";
import { callApiGetUserNp } from "../reusableFunction/callApi";
import { useAppDispatch } from "../context/Hooks";
import { updateProfileData } from "../context/slices/ProfileDataSlice";
import { updateMessageData } from "../context/slices/MessageDataSlice";
import { updateLoadingData } from "../context/slices/LoadingDataSlice";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import { ENDPOINT } from "../Config";
import { io } from "socket.io-client";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation("auth");
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseData, setResponseData] = useState("");
  const dispatch = useAppDispatch();

  function validateForm() {
    return name.length > 0 && email.length > 0 && password.length > 0;
  }
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(`user ${user.uid} is created`);

          if (auth.currentUser !== null) {
            await updateProfile(auth.currentUser, {
              displayName: numberPlate.toUpperCase(),
            })
              .catch((error) => {
                console.log(error);
                navigate("/error");
              })
              .then(async () => {
                var numberPlate = user.displayName as string;

                const result = await callApiGetUserNp(numberPlate);
                if (result === false) {
                  dispatch(
                    updateSnackbarData({
                      snackState: true,
                      severity: "error",
                      message: `Error occured, please try again`,
                    })
                  );
                } else {
                  dispatch(
                    updateSnackbarData({
                      snackState: true,
                      severity: "info",
                      message: `Welcome to the app!`,
                    })
                  );
                  const socketProfile = io(`${ENDPOINT}`);
                  socketProfile.on("newChangesInProfile", (profileList) => {
                    dispatch(updateProfileData(profileList));
                    dispatch(updateLoadingData("loaded"));
                  });

                  const socketMessages = io(`${ENDPOINT}`);
                  socketMessages.on("newChangesInMessages", (messageList) => {
                    dispatch(updateMessageData(messageList));
                  });
                }
              });
          }

          try {
            await setDoc(doc(db, numberPlate.toUpperCase(), "userInfo"), {
              userUid: user.uid,
              name: name,
              numberPlate: numberPlate.toUpperCase(),
              email: user.email,
            });
          } catch (error) {
            navigate(`/error`);
          }
        })
        .catch((error) => {
          var errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            setResponseData("This email adress is already in use.");
          } else if (
            errorMessage ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setResponseData("Password should be at least 6 characters.");
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
    } else {
      setResponseData("Your password and confirmation password do not match.");
    }
  }

  return (
    <div>
      <button onClick={() => i18n.changeLanguage("ja")}>ja</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <div className="login-title">{t("signupTitle")}</div>
      <LockIcon />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="register-error-message">{responseData}</div>
        <SignupName name={name} setName={setName} />
        <SignupNumberPlate
          numberPlate={numberPlate}
          setNumberPlate={setNumberPlate}
        />
        <SignupEmail email={email} setEmail={setEmail} />
        <SignupPassword
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <div className="login-button">
          <Button1 data-type="submit" disabled={!validateForm()}>
            Signup
          </Button1>
        </div>
        <NavLink to={`/signin`}>
          <div className="toggle-signin-signup">{t("SwitchToSignin")}</div>
        </NavLink>
      </form>
    </div>
  );
}
