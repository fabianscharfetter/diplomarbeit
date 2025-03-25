// HeaderCustomer.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/HeaderCustomer.css";
import { IoHomeOutline } from "react-icons/io5";
//import { CgProfile } from "react-icons/cg";
import ProfilePopup from "./ProfilePopup";
import { useAuth } from "../Context/useAuth";

const HeaderCustomer: React.FC = () => {
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src="/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="menu-icon" onClick={() => setIsMenuOpen((prev) => !prev)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                <Link to="/Home">{"\u00DCber uns"}</Link>
                <Link className="link" to="/account">
                    <IoHomeOutline /> Home
                </Link>
                {/* Überprüfen, ob userRole definiert ist und es den Wert 0 hat 
                {userRole && userRole === 0 && (
                    <Link className="link" to="#" onClick={() => setIsPopupOpen(true)}>
                        <CgProfile /> Profil
                    </Link>
                )}*/}
                {/* Überprüfen, ob userRole definiert ist und größer als 0 
                {userRole && userRole > 0 && (
                    <Link className="link" to="/account/cam">
                        CamPage
                    </Link>
                )}*/}

                <a onClick={logout} className="link">
                    Abmelden
                </a>
            </nav>
            <ProfilePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </header>
    );
};

export default React.memo(HeaderCustomer);
