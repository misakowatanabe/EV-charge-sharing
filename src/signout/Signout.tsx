import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { ENDPOINT } from "../Config";

export default function Signout() {
  const auth = getAuth();

  const handleSignOut = () => {
    const socketProfile = io(`${ENDPOINT}`);
    socketProfile.on("newChangesInProfile", function () {
      socketProfile.disconnect();
      console.log(`socket closed: ${socketProfile.disconnected}`);

      signOut(auth)
        .then(() => {
          console.log("signout done");
        })
        .catch((error) => {
          console.log("signout failed");
        });
    });
  };

  return (
    <Button onClick={handleSignOut} autoFocus className="signout-button">
      Sign out
    </Button>
  );
}
