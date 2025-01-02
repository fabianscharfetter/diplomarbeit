import HeaderCustomer from '../User/HeaderCustomer';
/*import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Login';*/
import Footer from '../Footer';
import '../Stylesheets/Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/useAuth";


const Account: React.FC = () => {
    const { user } = useAuth();
    return (
        <>
            <HeaderCustomer />
            <body className="body">

                <h1>Eingelogged als {user?.secondname}</h1>


                <div className="standorte">

                    

                <h1>Standorte</h1>

                <div className="auswahl">
                        <div className="standort">
                            <Link className="link" to="/LagerPage">
                                <img src="../public/Saalfelden.jpeg" className="saalfeldenpicture" alt="Saalfelden" />
                            </Link>
                            <h2>Saalfelden</h2>
                        </div>
                        <div className="standort">
                            <Link className="link" to="/LagerPage">
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

export default Account;