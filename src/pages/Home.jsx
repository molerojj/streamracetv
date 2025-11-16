import React from 'react';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import Publicidad from '../components/Publicidad';
import BackToTopButton from '../components/BackToTopButton';
import Bannerpublicidad from '../components/Bannerpublicidad'

const Home = () => {
  return (
    <>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto pt-20 px-2 scroll-smooth">
        <div id="servicios">
          <Services />
        </div>
      </div>

      <Bannerpublicidad />
      
      <div className="max-w-7xl mx-auto pt-6 sm:pt-12 px-6 scroll-smooth">
        <div id="publicidad">
          <Publicidad />
        </div>
      </div>
      <BackToTopButton /> 
    </>
  );
};
export default Home;