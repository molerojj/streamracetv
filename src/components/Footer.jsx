import React from 'react';
import { ArrowRight } from 'lucide-react';
import bgHorses from '../assets/horses.jpg';

const Footer = () => {
  return (
    <footer className="relative mt-20 py-24 px-6 text-white text-center overflow-hidden" 
        style={{
        backgroundImage: `url(${bgHorses})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
        <div className="absolute inset-0 bg-black/70 z-0 backdrop-blur-sm" />
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Grupo de apuestas{' '}
                    <span className="text-custom-red">El Gran Runner</span>
                </h2>
                <p className="text-lg sm:text-xl text-neutral-300 mt-6 max-w-2xl mx-auto">
                    Te invita a formar parte de sus salas de apuestas.
                     <br />
                     PARADAS ENTRE TERCIOS - DEPORTES - GANADORES.
                </p>
            <div className="mt-10">
                <a href="https://chat.whatsapp.com/JXdLHJviwpTGOm1lw7jbxb?mode=wwc" target='_blank' className="inline-flex items-center px-6 py-4 bg-custom-red hover:bg-blue-800 text-white font-bold text-lg rounded-xl transition duration-500 gap-2 shadow-lg">
                    ÚNETE A EL GRAN RUNNER
                    <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;