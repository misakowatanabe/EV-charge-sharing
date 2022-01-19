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
import Button1 from "../buttons/Button1";
import LockIcon from "../icon/LockIcon";
import { useAppDispatch } from "../context/Hooks";
import { updateProfileData } from "../context/slices/ProfileDataSlice";
import { updateLoadingData } from "../context/slices/LoadingDataSlice";
import { ENDPOINT } from "../Config";
import { io } from "socket.io-client";

export default function Signup() {
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
                navigate(`/error`);
              })
              .then(() => {
                var numberPlate = user.displayName;
                const numberPlateData = { data: numberPlate };
                console.log(
                  `Auth OK, user logged in ${user.uid}, DN: ${numberPlate}`
                );

                try {
                  fetch(`${ENDPOINT}/catch-user-np`, {
                    method: "POST",
                    body: JSON.stringify(numberPlateData),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    mode: "cors",
                  }).then((res) => {
                    res.json().then((data) => {
                      console.log(
                        "In signup, Successfully sent uid to backend"
                      );

                      const socketProfile = io(`${ENDPOINT}`);
                      socketProfile.on("newChangesInProfile", (profileList) => {
                        dispatch(updateProfileData(profileList));
                        dispatch(updateLoadingData("loaded"));
                        console.log(
                          `socket opened: ${socketProfile.connected}`
                        );
                        console.log(`Loading OK`);
                      });
                    });
                  });
                } catch (error) {
                  console.log(error);
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
      <div className="login-title">Sign up</div>
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
          <div className="toggle-signin-signup">
            Already have an account? Sign in
          </div>
        </NavLink>
      </form>
    </div>
  );
}
