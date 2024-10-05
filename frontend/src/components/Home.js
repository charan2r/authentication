import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
//import nightsky from '../images/night-sky.json';
import space from '../images/space.json';
import Lottie from 'lottie-react';
//import { useEffect, useState } from 'react';

const Home = () => {
    return (
        <div>
            <div className="home-container">
                <div className="content-container">
                    <Navbar className="navbar" />
                    <h1 className="title">Welcome</h1>
                    <p className="description">
                        Discover the wonders of the night sky and explore the universe with us.
                    </p>
                    <a href="#explore" className="explore-button">
                        Explore Now
                    </a>
                </div>

                <div className="lottie-container">
                   <Lottie animationData={space} loop={true} />
               </div>

               
            </div>
            <Footer />
        </div>
    );
};

export default Home;
