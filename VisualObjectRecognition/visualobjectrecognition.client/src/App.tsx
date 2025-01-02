import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import LoginPage from './Pages/LoginPage';
import Account from './Pages/Account';
import LagerPage from './User/LagerPage';
import './Stylesheets/App.css';
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
    return (
        <>
            <UserProvider>
                <Outlet />
                <ToastContainer />

            <body className="body">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/account/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/lager" element={<LagerPage />} />
                </Routes>
            </body>

            <ToastContainer />
            </UserProvider>
        </>
    );
};

export default App;
