import HeaderCustomer from './HeaderCustomer';
/*import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Login';*/
import Footer from '../Footer';
import '../Stylesheets/HomeCustomer.css';
import { Link } from 'react-router-dom';

const HomeCustomer: React.FC = () => {
    return (
        <>
            <HeaderCustomer />
            <body className="body">
            <div className="standorte">

                <h1>Standorte</h1>

                <div className="auswahl">
                        <div className="standort">
                            <Link to="">
                                <img src="../public/Saalfelden.jpeg" className="saalfeldenpicture" alt="Saalfelden" />
                            </Link>
                            <h2>Saalfelden</h2>
                        </div>
                        <div className="standort">
                            <Link to="">
                                <img src="../public/ZellAmSee.jpeg" className="zellpicture" alt="Zell am See" />
                            </Link>
                            <h2>Zell am See</h2>
                        </div>
                </div>
            </div>
            </body>
            <Footer />
        </>
    );
};

export default HomeCustomer;