import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src="./public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/Home"><img src=""></img></Link>
                <Link to="/about">{"\u00DCber uns"}</Link>
                <Link to="/login">Anmelden</Link>
            </nav>
        </header>
    );
};

export default Header;
