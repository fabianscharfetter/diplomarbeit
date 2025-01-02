import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/HeaderCustomer.css';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import ProfilePopup from './ProfilePopup';
import { useAuth } from "../Context/useAuth";



const HeaderCustomer: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { logout } = useAuth();


    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <header className="header" >
            <div className="logo-container" >
                <Link to="/home" >
                    <img src="../public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            < nav className="nav-links" >
                <Link to="/Home" > <IoHomeOutline /> </Link >
                <div className="profile" onClick={openPopup}>
                    <a className="profile-link">
                        <CgProfile />
                    </a>
                    <a className="profile-link-text"> Profil </a>
                </div>

                <a onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"> Abmelden </a>
            </nav>
            <ProfilePopup isOpen={isPopupOpen} onClose={closePopup} />
        </header>
    );
};

export default HeaderCustomer;