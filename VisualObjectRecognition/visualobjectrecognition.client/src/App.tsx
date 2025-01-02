import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import LoginPage from './Pages/LoginPage';
import HomeCustomer from './User/HomeCustomer';
import LagerPage from './User/LagerPage';
import './Stylesheets/App.css';
//import "dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
    return ( 
        <Router>
            <UserProvider>

            <body className="body">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/account/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route path="/User/HomeCustomer" element={<HomeCustomer />} />
                    <Route path="/User/LagerPage" element={<LagerPage />} />
                </Routes>
            </body>

            <ToastContainer />
            </UserProvider>
        </Router>
        
    );
};

export default App;
