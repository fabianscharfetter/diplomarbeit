import React from 'react';
import Header from '../Header'
import Footer from '../Footer'

const About: React.FC = () => {
    return (
        <>
            <Header></Header>
            <main className="main-content">
                <h1>About Us</h1>
                <p>Das ist die About - Page.</p>
            </main>
            <Footer></Footer>
        </>
    );
};

export default About;
