
import React from 'react';
import { MessageCircle, PhoneCall, Megaphone } from 'lucide-react';
import publicidadData from '../data/publicidad.js';
import imagenes from '../constants/publicidadMap';
import espacios from '../constants/espaciosPublicidad.jsx';

const Publicidad = () => {
    return (
        <div className="mt-20 px-6 text-white">
            <h2 className="text-center text-4xl sm:text-5xl">
                Espacio <span className="text-custom-blue">Publicitario</span>
            </h2>
            <p className="text-center text-neutral-500 mt-4 text-lg">
                Promociona tu marca con nosotros y alcanza miles de aficionados
            </p>
            
            {/* PUBLICIDAD DISPONIBLE */}

            <div className="flex flex-wrap justify-center gap-6 mt-16">
                {espacios.map((espacio, index) => (
                <div key={index} className="bg-gradient-to-br p-6 rounded-3xl w-full sm:w-[300px] flex flex-col justify-between items-center border border-white/10 shadow-sm hover:border-custom-blue transition duration-500">
                    <div className="w-full flex items-center gap-3 mb-6">
                        <div className="bg-neutral-800 p-2 rounded-xl">
                            {espacio.icono}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">
                                {espacio.nivel}
                            </h3>
                            <p className="text-sm text-neutral-400">{espacio.etiqueta}</p>
                        </div>
                    </div>

                    <div className="bg-neutral-800/40 p-6 rounded-xl w-full flex flex-col items-center">
                        <Megaphone className="text-custom-blue mb-2" size={32} />
                        <p className="text-sm text-neutral-400">Espacio disponible</p>
                        <p className="text-xl font-semibold mt-1">Tu publicidad</p>
                        <a href="https://wa.link/8g3t92" target='_blank' className="mt-6 bg-custom-blue text-white font-bold py-2 px-6 rounded-lg transition-all hover:scale-105 active:scale-95">
                            Contratar
                        </a>
                    </div>
                </div>
                ))}
            </div>

            {/* PUBLICIDAD ACTIVA */}

            <h2 className="text-center text-4xl sm:text-5xl mt-20">
                <span className="text-custom-red font-extrabold">EL Gran Runner</span> y sus 3 salas.
            </h2>
            <p className="text-center text-neutral-500 mt-4 text-lg">
                Publicidad
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-16">

                {publicidadData.map((publicidad, index) => (
                    <div key={index} className="bg-neutral-900/60 backdrop-blur-md border border-white/10 hover:border-custom-red transition duration-500 p-6 rounded-3xl w-full sm:w-[320px] flex flex-col items-center shadow-sm">
                        <div className="mb-4 text-center">
                            <h3 className="text-xl font-semibold">
                                {publicidad.name}
                            </h3>
                            <p className="text-sm text-neutral-400">{publicidad.etiqueta}</p>
                        </div>

                        <div className="w-full overflow-hidden rounded-xl flex justify-center items-center bg-neutral-800">
                            <a href={publicidad.link} target="_blank" rel="noopener noreferrer" >
                                <img src={imagenes[publicidad.imagen]} alt={`Banner ${publicidad.name}`} className="object-contain w-full h-auto hover:opacity-90" />
                            </a>
                        </div>

                        <p className="mt-4 text-sm text-neutral-400 text-center">
                            {publicidad.etiqueta2}
                        </p>
                        <p className="text-xl font-bold mb-4 text-center mt-3">{publicidad.cta}</p>
                        <a href={publicidad.link} target='_blank' className="bg-custom-red text-white font-bold py-2 px-6 rounded-lg transition-all hover:scale-105 active:scale-95">
                            Contáctanos
                        </a>
                    </div>
                ))}
            </div>

            {/* CALL TO ACTION FINAL */}

            <div className="mt-20 flex justify-center ">
                <div className="hover:border-custom-blue transition duration-500 w-full max-w-3xl bg-neutral-900/70 border border-white/10 rounded-3xl text-center p-10 shadow-lg">
                    <div className="flex justify-center mb-4">
                        <div className="bg-neutral-900 p-3 rounded-full">
                            <MessageCircle className="text-custom-blue h-8 w-8" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Publica con Stream Race TV</h3>
                    <p className="text-neutral-400 mb-4">
                        Contáctanos para oportunidades de negocio
                    </p>
                    <div className="flex justify-center items-center gap-2 text-custom-blue text-xl font-bold">
                        <PhoneCall className="w-6 h-6" />
                        <a href='https://wa.link/8g3t92' target='_blank'><span>+57 320-3275058</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publicidad;