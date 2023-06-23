import React, { useState } from "react";
import "./RegisterModel.css";
import mailIcon from "../../../images/Vector (5).png";
import mobileIcon from "../../../images/Vector (8).png";
import userIcon from "../../../images/Vector (7).png";
import passwordIcon from "../../../images/Vector (6).png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterModel = ({ closeRegisterModel }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formValue.name ||
      !formValue.email ||
      !formValue.mobile ||
      !formValue.password
    ) {
      setError(true);
    } else {
      setError(false);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { name, email, mobile, password } = formValue;
        const user = await axios.post(
          "http://localhost:5000/register",
          { name, email, mobile, password },
          config
        );
        const { data } = user;
        localStorage.setItem("feedback_user", JSON.stringify(data));

        if (data.status === "failed") {
          toast.warn(`${data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success(`${data.message}`, {
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
            closeRegisterModel();
          }, 3000);
        }

        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(`something went wrong`, {
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
      <div
        className="register_model_wrapper"
        onClick={closeRegisterModel}
      ></div>
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
      <div className="register_model">
        <div className="register_model_form_section">
          <div className="register_model_form">
            <h1>SignUp to Continue</h1>
            <div className="input_box">
              <img src={userIcon} alt="" />
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formValue.name}
              />
            </div>
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
              <img src={mobileIcon} alt="" />
              <input
                className="input"
                type="number"
                placeholder="Mobile"
                name="mobile"
                onChange={handleChange}
                value={formValue.mobile}
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
              Already have an account ? <a href="">Log In</a>
            </p>
            <button className="signup_model_btn" onClick={handleSubmit}>
              Singup
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

export default RegisterModel;
