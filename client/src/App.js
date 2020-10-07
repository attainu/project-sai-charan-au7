import React, { useEffect, createContext, useReducer, useContext } from "react";
import Header from "./Components/header/Header";
import LoignSignup from "./Components/loginSignup/LoginSignup";
import Body from "./Components/Body";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./styles.css";
import Explore from "./Components/posts/Feed";
import VerifyEmail from "./Components/loginSignup/VerifyEmail";
import { reducer, initialState } from "./reducers/userReducer";
import Chat from "./Components/chat/Chat";
import Main from "./Components/Body.js";
import Profile from "./Components/profile/Profile";
import Friends from "./Components/friends/Friends";
import Comments from "./Components/comments/Comments";
import Search from "./Components/search/Search";

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
      <Route exact path="/feed" component={Body} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/friends/:id" component={Friends} />
      <Route exact path="/post/comments/:id" component={Comments} />
      <Route exact path="/explore" component={Search} />
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
