import React from'react';
import { Link } from'react-router-dom';
import Header from '../Sections/Header';
import Hero from '../Sections/Hero';
import Features from '../Sections/Features';
import Footer from '../Sections/Footer';

const Home = () => {
  return (
    <>
    <div>
      <Header/>
      
    </div>
    <div>
      <Hero/>
    </div>
      <Features/>
      
      <Footer/>
    </>
  )
}

export default Home;