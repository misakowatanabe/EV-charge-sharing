import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";

export default function Signout() {
  const auth = getAuth();

  const handleSignOut = () => {
    setTimeout(() => {
      window.location.reload();
    }, 50);

    signOut(auth)
      .then(() => {
        console.log("signout done");
      })
      .catch((error) => {
        console.log("signout failed");
      });
  };

  return (
    <Button onClick={handleSignOut} autoFocus className="signout-button">
      Sign out
    </Button>
  );
}
