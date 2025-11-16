import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoRunner from '../assets/logo_runner.png'
import Bannerpublicidad from '../components/Bannerpublicidad'

import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Transmision = () => {

  const [revistas, setRevistas] = useState([]);
  const [fechaJornada, setFechaJornada] = useState('');

  const formatFechaJornada = (fecha) => {
    const fechaObj = new Date(`${fecha}T12:00:00`);
    const formato = fechaObj.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formato.charAt(0).toUpperCase() + formato.slice(1);
  };
  
  const [urlTransmision, setUrlTransmision] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'url_transmision'), (docSnap) => {
      if (docSnap.exists()) {
      setUrlTransmision(docSnap.data().valor);
      }
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'fecha_jornada'), (docSnap) => {
      if (docSnap.exists()) {
      setFechaJornada(docSnap.data().valor);
      }
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'revistas'), (snapshot) => {
  const docs = snapshot.docs.map(doc => ({
  ...doc.data(),
  id: doc.id,
  }));
  setRevistas(docs);
  });

  return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-white">
      
      <div className="flex justify-center">
        <img
          src={logo}
          alt="Logo Stream Race TV"
          className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-52"
        />
      </div>

      {/* Título de la página */}

      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-custom-purple text-transparent bg-clip-text mb-20">
        Stream Race{" "} <span className='text-transparent bg-clip-text text-white'>TV</span>
      </h1>

      {/* Contenedor de la transmision*/}

      <div className="w-full aspect-video max-h-[650px] flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-br from-blue-500 to-purple-700 opacity-40 transition-all duration-500 z-0 blur-3xl" />
        <div className="absolute inset-0 rounded-2xl border border-blue-800 z-10"></div>
          <iframe
            src={urlTransmision}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            scrolling="no"
            title="Transmisión en vivo"
            className="w-full h-full rounded-2xl z-20"
          />
      </div>

      {/* PUBLICIDAD RUNNER*/}

        <div className="w-full max-w-7xl mx-auto  py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Imagen del lado izquierdo */}
          <div className="flex-shrink-0">
            <img src={logoRunner} alt="El Gran Runner" className="w-40 sm:w-52 lg:w-64 xl:w-72" />
          </div>

          {/* Texto y botón del lado derecho */}
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-loose tracking-loose">
              Apuesta a lo grande con <br />
              <span className="lg:text-6xl bg-custom-red text-transparent bg-clip-text">El Gran Runner</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 mt-6 max-w-2xl lg:mx-0 mx-auto">
              Únete a miles de apostadores que ya están disfrutando de las mejores cuotas y promociones exclusivas. ¡No te quedes fuera de la acción!
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              <a
                href="https://wa.link/8g3t92"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-4 bg-custom-red text-white font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 duration-500 gap-2 shadow-lg"
              >
                APUESTA AHORA
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      {/* Archivos PDF para descargar */}

      <div className="mt-18">
        <h2 className="text-3xl font-semibold mb-4 text-center">
        Revistas de la jornada
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          {fechaJornada
            ? formatFechaJornada(fechaJornada)
            : 'Cargando...'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {revistas.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 bg-neutral-900/70 p-3 rounded-xl border border-white/10 shadow-md"
            >
              {/* Título */}
              <span className="text-white font-medium text-sm sm:text-base truncate">
                {file.titulo}
              </span>

              {/* Botón de descarga */}
              <a
                href={`https://drive.google.com/uc?export=download&id=${file.id_archivo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-custom-purple text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Download size={18} />
                Descargar
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para regresar al inicio */}
      <div className="mt-14 sm:mt-20 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-4 bg-custom-blue text-white font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 duration-500 gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a pagina principal
        </Link>
      </div>
      
      <div className="mt-12 sm:mt-20" />
      <Bannerpublicidad />

    </div>
  );
};

export default Transmision;