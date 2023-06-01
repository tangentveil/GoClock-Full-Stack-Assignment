import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  return (
    <div className="header">
      <nav className="main-nav">
        <div className="navbar">
          <button className="nav-item nav-links" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
