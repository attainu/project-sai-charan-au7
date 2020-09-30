import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        {/*<img
          src="https://i.pinimg.com/originals/0a/93/cc/0a93cc6ea46e59c7d83bc84fb002b92c.jpg"
          alt=""
        />*/}
        <h3>Logo</h3>
      </div>
      <div className="header__center">
        <div className="header__option header__option--action">
          <HomeIcon fontSize="large" />
        </div>
        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar src="" />
          <h4>sai</h4>
        </div>
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
