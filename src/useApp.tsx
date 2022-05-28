import { useEffect } from "react";
import { callApiGetUserNp } from "./reusableFunction/callApi";
import { updateUserAuthData } from "./context/slices/UserAuthDataSlice";
import { updateMessageData } from "./context/slices/MessageDataSlice";
import { updateProfileData } from "./context/slices/ProfileDataSlice";
import { updateLoadingData } from "./context/slices/LoadingDataSlice";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAppDispatch } from "./context/Hooks";
import { updateSnackbarData } from "./context/slices/SnackbarDataSlice";
import { io } from "socket.io-client";
import { ENDPOINT } from "./Config";

const useApp = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const socket = io(`${ENDPOINT}`);
      let userSessionTimeout = 0;

      if (user) {
        // User is signed in
        dispatch(updateLoadingData("loading"));
        dispatch(updateUserAuthData(true));

        if (auth.currentUser!.displayName) {
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
          }

          socket.on("newChangesInProfile", (profileList) => {
            dispatch(updateProfileData(profileList));
            dispatch(updateLoadingData("loaded"));
          });

          socket.on("newChangesInMessages", (messageList) => {
            dispatch(updateMessageData(messageList));
          });
        }

        user.getIdTokenResult().then((idTokenResult) => {
          const authTime = Number(idTokenResult.claims.auth_time) * 1000;
          const sessionDurationInMilliseconds = 60 * 60 * 1000; // 60 min
          const expirationInMilliseconds =
            sessionDurationInMilliseconds - (Date.now() - authTime);

          userSessionTimeout = window.setTimeout(() => {
            signOut(auth)
              .then(() => {
                console.log("Session timeout. Sign-out successful.");
              })
              .catch((error) => {
                console.log(`Session timeout. Sign-out failed: ${error}`);
              });

            setTimeout(() => {
              window.location.reload();
            }, 50);
          }, expirationInMilliseconds);
        });
      } else {
        // User is signed out
        socket.disconnect();
        dispatch(updateUserAuthData(false));
        dispatch(updateMessageData([]));
        dispatch(updateProfileData([{ userUid: 0, name: "", email: "" }]));
        dispatch(updateLoadingData("nothing to load"));

        clearTimeout(userSessionTimeout);
        userSessionTimeout = 0;
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, dispatch]);
};

export default useApp;
