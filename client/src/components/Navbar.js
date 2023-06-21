import React from "react";
import { Link } from "react-router-dom";
import Userbar from "./Userbar";

export const Navbar = () => {

    return (
        <div className="header">
            <div className="wrapper">
                <div className="app-name"><span className="part-one">budget</span>-app</div>
                <div className="navbar">
                    <Link to="/">Főoldal</Link>
                    <Link to="/create-item">Új tétel felvétele</Link>
                </div>
            </div>
            <div>
                <Userbar />
            </div>
        </div>
    );
}