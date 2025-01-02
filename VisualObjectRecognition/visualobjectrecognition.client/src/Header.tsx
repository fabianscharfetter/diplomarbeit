import React from 'react';
import { Link } from 'react-router-dom';
import './Stylesheets/Header.css';
import { useAuth } from "./Context/useAuth";

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src="./public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <a href="https://lagerage.at/home">SelfStorage</a>
                <a href="https://lagerage.at/home/immobilien">Immobilien</a>
                <Link to="/about">{"\u00DCber uns"}</Link>
                {isLoggedIn() ? (
                    <>
                        <Link className="account-link" to="/account">Willkommen,{user?.firma} {user?.secondname}</Link>
                        <a onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"> Abmelden </a>
                    </>
                ) : (
                        <>
                            <Link to="/account/login" className="hover:text-darkBlue"> Anmelden </Link>
                            <Link to="/account/register" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"> Registrieren </Link>
                        </>
                )}
            </nav>
            
        </header>
    );
};

export default Header;
