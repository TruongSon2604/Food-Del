import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
            deleniti tempora in voluptate quaerat corporis sunt accusantium
            debitis, unde tenetur, explicabo molestiae animi? Harum facere
            repellendus, illum assumenda maxime cumque?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+84 RUBY MINH DUC</li>
                <li>truongngocson26042003@gmai.com</li>
            </ul>
        </div>
       
        
      </div>
      <hr />
      <p className="footer-copyright">
            Copy Right @2024 - All Reserved.
        </p>
    </div>
  );
};

export default Footer;
