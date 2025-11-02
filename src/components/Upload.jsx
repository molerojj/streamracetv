import React, { useContext, useState, useEffect } from 'react';
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
  const whiteList = ['tucorreo@gmail.com', 'admin@gmail.com'];

  const fetchRevistas = async () => {
    const snapshot = await getDocs(collection(db, 'revistas'));
    const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRevistas(docs);
  };

  useEffect(() => {
    if (user) fetchRevistas();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'revistas', id));
    fetchRevistas();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (titulo && id_archivo) {
      await addDoc(collection(db, 'revistas'), { titulo, id_archivo });
      setTitulo('');
      setId_archivo('');
      fetchRevistas();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Ingresar con Google
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
      <h1 className="text-3xl font-semibold mb-6">Panel de administración</h1>

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

      <div className="space-y-4">
        {revistas.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg"
          >
            <div>
              <p className="font-bold">{r.titulo}</p>
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