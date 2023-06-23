import React from "react";
import "./Banner.css";
import BannerImage from "../../../images/image 1.png";

const Banner = () => {
  return (
    <div className="banner_wrapper">
      <div className="bannerimg">
        <img src={BannerImage} alt="bannerImage" />
      </div>
      <div className="banner_details">
        <h1>Add your products and give your valuable feedback</h1>
        <p>
          Easily give your feedback in a matter of minutes. Access your audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
};

export default Banner;
