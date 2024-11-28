import React from 'react';
import Header from '../Header'
import Footer from '../Footer'


const Home: React.FC = () => {
    return (
        <>
            <Header></Header>
            <main className="main-content">
                <h1>Visual Object Recognition</h1>
                <p>Das ist die Home - Page.</p>
            </main>
            <Footer></Footer>
        </>
        
    );
};

export default Home;
