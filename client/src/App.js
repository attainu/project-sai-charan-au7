import React from "react";
import Header from "./Components/header/Header";
import LoignSignup from "./Components/loginSignup/LoginSignup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";
import Explore from "./Components/explore/Explore";
function loggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return user;
  } else {
    return {};
  }
}

function requireAuth(nextState, replace) {
  console.log(loggedIn());
  if (!loggedIn()) {
    replace({
      pathname: "/joinus",
    });
  }
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/joinus" component={LoignSignup} />
          <Route exact path="/feed" component={Explore} onEnter={requireAuth} />
        </Switch>
      </Router>
    </div>
  );
}
