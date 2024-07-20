import React from "react";
import Container from "../container/Container";
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  const links=['About',"Home","Posts","Team"]
  const socialMedia=[    <FacebookIcon/>,
    <InstagramIcon/>,
    <TwitterIcon/>,
    <LinkedInIcon/>]
  return (
    
    <div className="  text-white  ">
      <Container className={"grid bg-[#212529] py-3 md:py-16 px-6 grid-cols-2 md:grid-cols-4 lg:md:justify-items-center gap-12 "}>
        <div className="grid">
          <h1 className="text-sm lg:text-xl">Contact the Publisher</h1>
          <ul className="text-[#a7a4a4] text-[14px] lg:text-lg">
            <li>sagar@gmail.com</li>
            <li>-9846883501</li>
          </ul>
        </div>
        <div className="grid">
          <h1 className="text-sm lg:text-xl">Explore</h1>
          <ul className="text-[#a7a4a4] text-[14px] lg:text-lg">
               {links.map((link)=>(
                <li className="hover:text-white cursor-pointer">{link}</li>
               ))} 
          </ul>
        </div>
        <div className="grid">
          <h1 className="text-sm lg:text-xl">HeadQuarter</h1>
          <ul className="text-[#a7a4a4] text-[14px] lg:text-lg">
          <li>Pokhara-29,</li>
          <li>Nepal</li>
          </ul>
        </div>
        <div className="grid ">
          <h1 className="text-sm lg:text-xl ">Connections</h1>
          <p className="flex gap-4 text-[#a7a4a4] text-[14px] lg:text-lg">
               {socialMedia.map((socailmediaIcon)=>
              (
                <Link className=" text-[#a7a4a4] hover:text-white"> {socailmediaIcon}</Link>
              ))}
          </p>
        </div>
      </Container>
      <div className="flex md:justify-between justify-center bg-[#343A40] text-[#d6d2d2] py-8 lg:px-20 px-4">
                <strong>2024 | @all rights reserved</strong>
                <strong className="text-sm md:block hidden">
                 Sagar Adhikari
                </strong>
      </div>
    </div>
  );
}

export default Footer;
