import React from 'react';
import "./Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { GrMailOption, GrLocation, GrPhone } from "react-icons/gr";

const Footer = () => {
  return (
    <>

      <footer className="footer-distributed w-100% fixed-button" style={{ marginTop: "500px" }} >

        <div className="footer-left">

          <h3>Company<span>logo</span></h3>

          <p className="footer-links">
            <a href="#" className="link-1">Home</a>

            <a href="#">Blog</a>

            <a href="#">Pricing</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </p>

          <p className="footer-company-name">Company Name © 2015</p>
        </div>

        <div className="footer-center">

          <div>
            <GrLocation className="ficondes ficondes1" />
            <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
          </div>

          <div>
            <GrPhone className="ficondes ficondes2" />
            <p>+1.555.555.5555</p>
          </div>

          <div>
            <GrMailOption className="ficondes ficondes3" />
            <p><a href="mailto:support@company.com">support@company.com</a></p>
          </div>

        </div>

        <div className="footer-right">

          <p className="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div className="footer-icons">

            <a href="https://www.facebook.com"><FaFacebook className="fafbook" /></a>
            <a href="#"><FaTwitter className="fatwitter" /></a>
            <a href="#"><FaLinkedin className="falinkedin" /></a>
            <a href="#"><FaGithubSquare className="fagithub" /></a>

          </div>

        </div>

      </footer>
    </>
  )
}

export default Footer;
