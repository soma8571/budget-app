import React from "react";
import { Link } from "react-router-dom";
import Userbar from "./Userbar";


export const Navbar = () => {

   return (
      <div className="header">
         <div className="wrapper">
            <div className="app-name">
               <span className="part-one">budget</span>-app</div>
               <div className="navbar">
                  <Link to="/">
                     <i className="fa-solid fa-house" style={{color: "#e59500", margin: "0 0.5rem"}}></i>
                     Főoldal
                  </Link>
                  <Link to="/create-item">
                     <i className="fa-solid fa-circle-plus" style={{color: "#e59500", margin: "0 0.5rem"}}></i>
                     Új tétel felvétele
                  </Link>
               </div>
            </div>
         <div>
            <Userbar />
         </div>
      </div>
   );
}