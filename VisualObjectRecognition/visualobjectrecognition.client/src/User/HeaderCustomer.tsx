import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/HeaderCustomer.css';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const HeaderCustomer: React.FC = () => {
    return (
        <header className="header" >
            <div className="logo-container" >
                <Link to="/home" >
                    <img src="../public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            < nav className="nav-links" >
                <Link to="/Home" > <IoHomeOutline /></Link >
                <Link to="/Profile" > <CgProfile /> Profil</Link >
                <Link to="/login" id="abmelden" > Abmelden </Link>
            </nav>
        </header>
    );
};

export default HeaderCustomer;