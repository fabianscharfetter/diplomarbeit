import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home';
import About from './Pages/About';
import LoginPage from './Pages/LoginPage';
import Footer from './Footer';
import './Stylesheets/App.css';
//import "dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
    return ( 
        <Router>
            <UserProvider>

            <Header />
            <body className="body">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/account/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </body>
            <Footer />

            <ToastContainer />
            </UserProvider>
        </Router>
        
    );
};

export default App;
