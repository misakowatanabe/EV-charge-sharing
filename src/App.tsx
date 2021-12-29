import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./context/Hooks";
import { updateUserAuthData } from "./context/slices/UserAuthDataSlice";
import { updateMessageData } from "./context/slices/MessageDataSlice";
import { updateProfileData } from "./context/slices/ProfileDataSlice";
import "./style/App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseConfig } from "./firebase/Firebase";
import { io, Socket } from "socket.io-client";
import { ENDPOINT } from "./Config";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import Home from "./home/Home";
import Account from "./account/Account";
import Setting from "./setting/Setting";
import NotFound from "./error/NotFound";
import Error from "./error/Error";

function App() {
  FirebaseConfig();
  const auth = getAuth();
  // const userAuth = useAppSelector((state) => state.userAuthData.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let userSessionTimeout = 0;

      if (user) {
        // User is signed in
        dispatch(updateUserAuthData(true));
        const uid = user.uid;
        const uidData = { uid: uid };
        console.log(`Auth OK, user logged in ${uid}`);

        try {
          await fetch(`${ENDPOINT}/catch-user-uid`, {
            method: "POST",
            body: JSON.stringify(uidData),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }).then((res) => {
            res.json().then((data) => {
              // Successfully sent uid to backend
              console.log("Successfully sent uid to backend");
            });
          });
        } catch (error) {
          console.log(error);
        }
        
        // const socketTodo = io(`${ENDPOINT}`);
        // socketTodo.on("newChangesInTodos", (todoList) => {
        //   dispatch(updateMessageData(todoList));
        // });
        const socketProfile = io(`${ENDPOINT}`);
        socketProfile.on("newChangesInProfile", (profileList) => {
          dispatch(updateProfileData(profileList));
        });
        console.log("Socket opened");

        //   const imagesDownloadRef = ref(storage, `profileImages/${uid}`);
        //   getDownloadURL(imagesDownloadRef)
        //     .then((url) => {
        //       dispatch(updateProfileImageData(url));
        //     })
        //     .catch((error) => {
        //       dispatch(updateProfileImageData(""));
        //     })
        //     .finally(() => {
        //       dispatch(updateIsLoadingData(false));
        //       console.log(`Loading OK`);
        //     });

        user.getIdTokenResult().then((idTokenResult) => {
          const authTime = Number(idTokenResult.claims.auth_time) * 1000;
          const sessionDurationInMilliseconds = 60 * 60 * 1000; // 60 min
          const expirationInMilliseconds =
            sessionDurationInMilliseconds - (Date.now() - authTime);
          userSessionTimeout = window.setTimeout(
            () =>
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  console.log("Session timeout. Sign-out successful.");
                })
                .catch((error) => {
                  // An error happened.
                  console.log(`Session timeout. Sign-out failed: ${error}`);
                }),
            expirationInMilliseconds
          );
        });
      } else {
        // User is signed out
        dispatch(updateUserAuthData(false));
        dispatch(updateMessageData([{ id: 0, message: "", date: "" }]));
        dispatch(updateProfileData([{ userUid: 0, name: "", email: "" }]));
        // dispatch(updateIsLoadingData(true));
        // dispatch(updateProfileImageData(null));

        clearTimeout(userSessionTimeout);
        userSessionTimeout = 0;
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
