import { IconButton } from "@material-ui/core";
import { CodeSharp, Home, People, Search } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../header/Header.css";
import { UserContext } from "../../App";
import user from "../../Services/authService.js";
function Header() {
  const state = user.getCurrentUser();

  const history = useHistory();
  const handlelogout = () => {
    user.logout();
    history.push("/joinus");
    window.location.reload();
  };
  return (
    <div className="topnav" id="myTopnav">
      {state ? (
        <>
          <Link to="/feed">
            <IconButton>
              <Home fontSize="large" style={{ color: "black" }} />
            </IconButton>
          </Link>

          <Link to="/explore">
            <IconButton>
              <Search fontSize="large" style={{ color: "black" }} />
            </IconButton>
          </Link>
          <Link to={`/friends/${state ? state.user._id : ""}`}>
            <IconButton>
              <People fontSize="large" style={{ color: "black" }} />
            </IconButton>
          </Link>

          <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
          </a>

          <div className="header__logout">
            <IconButton onClick={handlelogout}>
              <ExitToAppIcon fontSize="large" style={{ color: "black" }} />
            </IconButton>
          </div>
        </>
      ) : (
        <div>
          <img
            src="https://res.cloudinary.com/saisricharan/image/upload/v1602106247/logo_yahlz7.png"
            style={{ width: "10vw", height: "15vh" }}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
