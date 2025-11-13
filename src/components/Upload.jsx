import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import bgHero from '../assets/bghero.jpg';
import { AuthContext } from '../context/AuthContext';
import { loginWithGoogle, logout } from '../utils/auth';
import { isAuthorized } from '../utils/isAuthorized';
import { db } from '../firebase';
import {
  collection,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

const UploadPage = () => {
  const { user } = useContext(AuthContext);
  const [revistas, setRevistas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [id_archivo, setId_archivo] = useState('');
  const [urlTransmision, setUrlTransmision] = useState('');
  const [autorizado, setAutorizado] = useState(null);
  const [fechaJornada, setFechaJornada] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState('');

  // 🔁 Escuchar colección 'revistas' en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'revistas'), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRevistas(docs);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Escuchar config/fecha_jornada y config/url_transmision en tiempo real
  useEffect(() => {
    const unsubFecha = onSnapshot(doc(db, 'config', 'fecha_jornada'), (docSnap) => {
      if (docSnap.exists()) {
        setFechaJornada(docSnap.data().valor);
      }
    });

    const unsubUrl = onSnapshot(doc(db, 'config', 'url_transmision'), (docSnap) => {
      if (docSnap.exists()) {
        setUrlTransmision(docSnap.data().valor);
      }
    });

    return () => {
      unsubFecha();
      unsubUrl();
    };
  }, []);

  useEffect(() => {
    const verificarAcceso = async () => {
      if (user) {
        const acceso = await isAuthorized(user.email);
        setAutorizado(acceso);
      }
    };
    verificarAcceso();
  }, [user]);

  const handleUpdateTitulo = async (id, nuevoTitulo) => {
    try {
      await setDoc(doc(db, 'revistas', id), { titulo: nuevoTitulo }, { merge: true });
      toast.success('Título actualizado');
      setEditandoId(null);
      setNuevoTitulo('');
    } catch (error) {
      toast.error('Error al actualizar el título');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'revistas', id));
    toast.success('Revista eliminada');
  };

  const extractDriveId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
    return match ? match[1] : null;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const extractedId = extractDriveId(id_archivo);
    if (!titulo || !extractedId) {
      toast.error('Título o ID no válido');
      return;
    }
    try {
      await addDoc(collection(db, 'revistas'), {
        titulo,
        id_archivo: extractedId,
      });
      toast.success('Revista agregada correctamente');
      setTitulo('');
      setId_archivo('');
    } catch (error) {
      toast.error('Error al agregar la revista');
      console.error('Error:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-neutral-950 text-white">
        <img src="/isoazul.png" alt="Logo SRTV" className="w-60 mb-6 drop-shadow-xl" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 tracking-wide">
          Panel Admin SRTV
        </h1>
        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-3 bg-white text-black font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  if (autorizado === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Verificando acceso...</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold">⚠️ Acceso denegado</p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full relative px-4 mx-auto py-10 text-white"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />
      <div className="relative z-10 max-w-3xl px-4 mx-auto py-10 text-white">
        <div className="flex items-center justify-between mb-6">
          <img src="/isoazul.png" alt="Logo SRTV" className="w-60 mb-6 drop-shadow-xl" />
          <h1 className="text-3xl font-semibold">Admin SRTV</h1>
          <div className="text-right">
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Fecha Jornada */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await setDoc(doc(db, 'config', 'fecha_jornada'), {
                valor: fechaJornada,
              });
              toast.success('Fecha actualizada correctamente');
            } catch (error) {
              toast.error('Error al guardar la fecha');
              console.error(error);
            }
          }}
          className="mb-10"
        >
          <label className="text-sm block mb-2 text-neutral-300">
            Fecha de la jornada
          </label>
          <input
            type="date"
            value={fechaJornada}
            onChange={(e) => setFechaJornada(e.target.value)}
            className="bg-neutral-800 text-white px-4 py-2 rounded mb-4 w-full sm:w-[250px]"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Guardar fecha
          </button>
        </form>

        {/* URL Transmisión */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await setDoc(doc(db, 'config', 'url_transmision'), {
                valor: urlTransmision,
              });
              toast.success('URL de transmisión actualizada');
            } catch (error) {
              toast.error('Error al guardar la URL');
              console.error(error);
            }
          }}
          className="mb-10"
        >
          <label className="text-sm block mb-2 text-neutral-300">
            URL de transmisión
          </label>
          <input
            type="text"
            value={urlTransmision}
            onChange={(e) => setUrlTransmision(e.target.value)}
            placeholder="https://player.vimeo.com/..."
            className="bg-neutral-800 text-white px-4 py-2 rounded mb-4 w-full sm:w-[500px]"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Guardar URL
          </button>
        </form>

        {/* Agregar Revista */}
        <p className="text-xl mb-4">Agregar nueva revista</p>
        <form onSubmit={handleAdd} className="space-y-4 mb-10">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de la revista"
            className="w-full p-3 rounded bg-neutral-800 text-white"
            required
          />
          <input
            type="text"
            value={id_archivo}
            onChange={(e) => setId_archivo(e.target.value)}
            placeholder="Inserta URL de revista compartida por Google Drive"
            className="w-full p-3 rounded bg-neutral-800 text-white"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg text-white"
          >
            Agregar revista
          </button>
        </form>

        {/* Lista de revistas */}
        <p className="text-xl mb-4">
          Total revistas: <span className="font-bold text-yellow-400">{revistas.length}</span>
        </p>
        <div className="space-y-4">
          {revistas.map((r, index) => (
            <div key={r.id} className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
              <div>
                <p className="font-bold uppercase">
                  <span className="text-yellow-400 mr-2">#{index + 1}</span>
                  {editandoId === r.id ? (
                    <input
                      type="text"
                      className="bg-neutral-700 text-white px-2 py-1 rounded w-full"
                      value={nuevoTitulo}
                      onChange={(e) => setNuevoTitulo(e.target.value)}
                    />
                  ) : (
                    r.titulo
                  )}
                </p>
                <p className="text-neutral-400 text-sm">{r.id_archivo}</p>
              </div>
              <div className="flex gap-2">
                {editandoId === r.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateTitulo(r.id, nuevoTitulo)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditandoId(null);
                        setNuevoTitulo('');
                      }}
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditandoId(r.id);
                        setNuevoTitulo(r.titulo);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;