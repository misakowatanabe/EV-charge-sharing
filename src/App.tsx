import { HashRouter, Route, Routes } from "react-router-dom";
import "./style/App.css";
import { FirebaseConfig } from "./firebase/Firebase";
import useApp from "./useApp";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import Home from "./home/Home";
import Chat from "./chat/Chat";
import Account from "./account/Account";
import Setting from "./setting/Setting";
import NotFound from "./error/NotFound";
import Error from "./error/Error";
import SnackBar from "./reusableComponents/Snackbar";

function App() {
  FirebaseConfig();
  useApp();

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
            <Route path="chat/:userNP/:matchedNP" element={<Chat />} />
            <Route path="account" element={<Account />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <SnackBar />
    </div>
  );
}

export default App;
