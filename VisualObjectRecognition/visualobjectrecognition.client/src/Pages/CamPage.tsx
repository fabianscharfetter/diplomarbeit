import Header from '../User/HeaderCustomer';
import Footer from '../Footer';
import { MdOutlineZoomOutMap } from "react-icons/md";
import "../Stylesheets/CamPage.css";

function CamPage() { 
    const toggleFullscreen = () => {
        const livestreamContainer = document.querySelector(".livestream-container");
        if (livestreamContainer) {
            if (!document.fullscreenElement) {
                livestreamContainer.requestFullscreen().catch((err) => {
                    console.error(`Fehler beim Umschalten in den Vollbildmodus: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <>
            <Header />
            <h1>Admin-Cam:</h1>

            <div className="livestream-container">
                <video className="livestream-video" autoPlay muted loop>
                    <source src="livestream.mp4" type="video/mp4" />
                    Ihr Browser unterstützt dieses Video-Format nicht.
                </video>
                <button className="zoom-button" onClick={toggleFullscreen}>
                    <MdOutlineZoomOutMap />
                </button>
            </div>
            <Footer />
        </>
    );
}

export default CamPage;