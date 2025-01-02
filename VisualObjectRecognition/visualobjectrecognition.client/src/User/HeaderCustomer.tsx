import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/HeaderCustomer.css';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import ProfilePopup from "./ProfilePopup";
import { useAuth } from "../Context/useAuth";

const HeaderCustomer: React.FC = () => {
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <>
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src="../public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link className="link" to="/account"><IoHomeOutline /> Home</Link>
                    <Link className="link" onClick={openPopup} to={''}><CgProfile /> Profil</Link>
                    <a onClick={logout} className="link"> Abmelden </a>
            </nav>
            <ProfilePopup isOpen={isPopupOpen} onClose={closePopup} />
        </header >
        </>
    );
};

export default HeaderCustomer;