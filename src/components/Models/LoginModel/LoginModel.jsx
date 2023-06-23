import React, { useState } from "react";
import "./LoginModel.css";
import mailIcon from "../../../images/Vector (5).png";
import passwordIcon from "../../../images/Vector (6).png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginModel = ({ closeLoginModel }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      setError(true);
    } else {
      setError(false);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { email, password } = formValue;
        const user = await axios.post(
          "http://localhost:5000/login",
          { email, password },
          config
        );
        const { data } = user;
        localStorage.setItem("feedback_user", JSON.stringify(data));

        toast.success("login successfull", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          closeLoginModel();
        }, 3000);
      } catch (error) {
        console.log(error.response);
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      <div className="login_model_wrapper" onClick={closeLoginModel}></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="login_model">
        <div className="login_model_form_section">
          <div className="login_model_form">
            <h1>Login to Continue</h1>
            <div className="input_box">
              <img src={mailIcon} alt="" />
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formValue.email}
              />
            </div>

            <div className="input_box">
              <img src={passwordIcon} alt="" />
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formValue.password}
              />
            </div>
            <p className="error">
              {error ? "* all fields required in the form" : ""}
            </p>
            <p>
              Don't have an account ? <Link to="/register">Sign Up</Link>
            </p>
            <button className="signin_model_btn" onClick={handleSubmit}>
              Log In
            </button>
          </div>
          <div className="model_banner">
            <div className="banner_desc">
              <h2>Feedback</h2>
              <p>Add your product and rate other Items...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModel;
