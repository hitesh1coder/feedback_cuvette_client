import React from "react";
import "./Header.css";
import UserAvatar from "../../../images/userAvator.jpg";
import { useNavigate } from "react-router-dom";

const Header = ({ setRegisterModel, setLoginModel }) => {
  const user = JSON.parse(localStorage.getItem("feedback_user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="logo">
        <h2>FeedBack</h2>
      </div>
      {user ? (
        <div className="user_info">
          <span onClick={handleLogout}>Log out </span>
          <p>Hello! {user.name}</p>
          <img src={UserAvatar} alt="userimg" />
        </div>
      ) : (
        <div className="btns">
          <button className="login_btn" onClick={() => setLoginModel(true)}>
            Log In
          </button>
          <button className="signup_bt" onClick={() => setRegisterModel(true)}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
