import React from 'react';
import { Radio } from 'lucide-react';
import bgHero from '../assets/bghero.jpg';

const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center justify-center lg:justify-start text-white"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Capa oscura opcional */}
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-20
        lg:items-start lg:text-left lg:ml-24 max-w-2xl w-full">

        <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide font-extrabold">
          Stream Race TV
          <span className="text-4xl sm:text-6xl lg:text-6xl text-custom-blue">
            {" "}líder en transmisión en vivo.
          </span>
        </h1>

        <p className="mt-8 text-lg text-neutral-300">
          Vive la transmisión en vivo en alta definición, con pronósticos gratuitos y una experiencia inigualable para los aficionados hípicos de Latinoamérica y el mundo.  
        </p>

        <div className="flex justify-center lg:justify-start my-10">
          <a
            href="/transmision"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-custom-purple text-white inline-flex items-center gap-2 py-5 px-7 rounded-md  transition-all hover:scale-105 active:scale-95"
          >
            <Radio size={20} className="animate-pulse text-white" />
            Ver en vivo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;