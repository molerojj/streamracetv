import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoRunner from '../assets/logo_runner.png'
import Bannerpublicidad from '../components/Bannerpublicidad'
import URL from '../constants/url';

import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Transmision = () => {

  const [revistas, setRevistas] = useState([]);
  const [fechaJornada, setFechaJornada] = useState('');

  const formatFechaJornada = (fechaISO) => {
    const fecha = new Date(fechaISO + 'T12:00:00'); // ⚠️ Corrige desfase por zona horaria
    const formato = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formato.charAt(0).toUpperCase() + formato.slice(1);
  };

  useEffect(() => {
    const fetchFecha = async () => {
      const docRef = doc(db, 'config', 'fecha_jornada');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFechaJornada(docSnap.data().valor);
      }
    };
    fetchFecha();
  }, []);

  useEffect(() => {
    const fetchRevistas = async () => {
      const snapshot = await getDocs(collection(db, 'revistas'));
      const docs = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
      }));
      setRevistas(docs);
    };
    fetchRevistas();
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
            src={URL}
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

        <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
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
                className="inline-flex items-center px-6 py-4 bg-custom-red hover:bg-blue-800 text-white font-bold text-lg rounded-xl transition duration-500 gap-2 shadow-lg"
              >
                APUESTA AHORA
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      {/* Archivos PDF para descargar */}

      <div className="mt-20">
        <h2 className="text-3xl font-semibold mb-4 text-center">
        Revistas de la jornada
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          {fechaJornada
            ? formatFechaJornada(fechaJornada)
            : 'Cargando...'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
          {revistas.map((file, index) => (
            <div
              key={index}
              className="relative h-full w-full max-w-[200px] bg-neutral-900/70 p-6 rounded-2xl border border-white/10 shadow-lg overflow-hidden"
            >
              {/* Fondo decorativo en capa atrás */}
              <div className="absolute inset-0 bg-[url('/isoazul.png')] bg-center bg-no-repeat bg-contain opacity-30 pointer-events-none z-0" />

              {/* Contenido de la tarjeta */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase text-center">{file.titulo}</h3>
                </div>
                <a
                  href={`https://drive.google.com/uc?export=download&id=${file.id_archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 bg-custom-purple text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition"
                >
                  <Download size={20} />
                  Descargar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para regresar al inicio */}
      <div className="mt-20 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-4 bg-custom-blue hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition duration-500 gap-2 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a pagina principal
        </Link>
      </div>
      
      <div className='mt-20' />
      <Bannerpublicidad />

    </div>
  );
};

export default Transmision;