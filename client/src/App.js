import React, { useState } from "react";
import Header from "./Components/header/Header";
import LoignSignup from "./Components/loginSignup/LoginSignup";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./styles.css";
import Explore from "./Components/explore/Explore";
import AuthService from "./Services/authService";

export default function App() {
  const user = AuthService.getCurrentUser();
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/joinus" component={LoignSignup} />
          {user ? (
            <>
              <Route exact path="/feed" component={Explore} />
              <Route path="/feed" component={Explore} />
            </>
          ) : (
            <Redirect to="/joinus" />
          )}
        </Switch>
      </Router>
    </div>
  );
}
