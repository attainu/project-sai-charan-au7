import React, { useEffect, createContext, useReducer, useContext } from "react";
import Header from "./Components/header/Header";
import LoignSignup from "./Components/loginSignup/LoginSignup";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./styles.css";
import Explore from "./Components/explore/Explore";
import AuthService from "./Services/authService";
import VerifyEmail from "./Components/loginSignup/VerifyEmail";
import { reducer, initialState } from "./reducers/userReducer";
import Chat from "./Components/chat/Chat";

export const UserContext = createContext();

const Routing = () => {
  // document.documentElement.setAttribute('data-theme', 'light')

  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("mode")
  );

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/joinus");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/joinus" component={LoignSignup} />
      <Route exact path="/verify/:id" component={VerifyEmail} />
      <Route exact path="/feed" component={Explore} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
