import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { loginWithGoogle, logout } from '../utils/auth';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from 'firebase/firestore';

const UploadPage = () => {
  const { user } = useContext(AuthContext);
  const [revistas, setRevistas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [id_archivo, setId_archivo] = useState('');
  
  // Lista blanca de emails autorizados
  const whiteList = ['molerojj@gmail.com'];

  const fetchRevistas = async () => {
    const snapshot = await getDocs(collection(db, 'revistas'));
    const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRevistas(docs);
  };

const [fechaJornada, setFechaJornada] = useState('');

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
    if (user) fetchRevistas();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'revistas', id));
    toast.success('Revista eliminada');
    fetchRevistas();
  };

  const extractDriveId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
    return match ? match[1] : null;
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // ✅ Extraer solo el ID del link
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
      fetchRevistas();
    } catch (error) {
      toast.error('Error al agregar la revista');
      console.error('Error:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-neutral-950 text-white">
        {/* Logo */}
        <img
          src="/isoazul.png"
          alt="Logo SRTV"
          className="w-60 mb-6 drop-shadow-xl"
        />

        {/* Título */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 tracking-wide">
          Panel Admin SRTV
        </h1>

        {/* Botón de login con icono Google */}
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

  if (!whiteList.includes(user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold">Acceso denegado</p>
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
    <div className="max-w-3xl px-4 mx-auto py-10 text-white">
      <div className="flex items-center justify-between mb-6">
        <img
          src="/isoazul.png"
          alt="Logo SRTV"
          className="w-60 mb-6 drop-shadow-xl"
        />
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

      {/* Fecha dinamica de revistas */}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await setDoc(doc(db, 'config', 'fecha_jornada'), { valor: fechaJornada });
          toast.success('Fecha actualizada');
        }}
        className="mb-10"
      >
        <p className="text-xl mb-4">
          Modificar fecha de Revistas
        </p>
        
        <input
          type="date"
          value={fechaJornada}
          onChange={(e) => setFechaJornada(e.target.value)}
          className="bg-neutral-800 text-white px-4 py-2 rounded mb-4"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Guardar fecha
        </button>
      </form>

      {/* Form agregar revistas */}

      <p className="text-xl mb-4">
        Agregar nueva revista
      </p>

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
          placeholder="ID del archivo de Google Drive"
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

      <p className="text-xl mb-4">
        Total revistas: <span className="font-bold text-yellow-400">{revistas.length}</span>
      </p>

      <div className="space-y-4">
        {revistas.map((r, index) => (
          <div key={r.id} className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
            <div>
              <p className="font-bold">
                <span className="text-yellow-400 mr-2">#{index + 1}</span> {r.titulo}
              </p>
              <p className="text-neutral-400 text-sm">{r.id_archivo}</p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPage;