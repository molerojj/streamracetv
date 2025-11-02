import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
const [titulo, setTitulo] = useState('');
const [idArchivo, setIdArchivo] = useState('');
const [loading, setLoading] = useState(false);

const handleAddRevista = async () => {
   if (!titulo.trim() || !idArchivo.trim()) {
   alert('Completa todos los campos');
   return;
}

try {
   setLoading(true);
      await addDoc(collection(db, 'revistas'), {
      titulo,
      id_archivo: idArchivo,
      });
      setTitulo('');
      setIdArchivo('');
      alert('Revista agregada correctamente 🚀');
   } catch (error) {
      console.error('Error al agregar revista', error);
      alert('Error al subir la revista');
      } finally {
      setLoading(false);
   }
};

return (
   <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Subir Revista</h1>
      <div className="max-w-md w-full grid gap-4">
         <input
         type="text"
         placeholder="Título de la Revista"
         className="bg-neutral-800 text-white px-4 py-2 rounded-md"
         value={titulo}
         onChange={(e) => setTitulo(e.target.value)}
         />
         <input
         type="text"
         placeholder="ID del archivo de Drive"
         className="bg-neutral-800 text-white px-4 py-2 rounded-md"
         value={idArchivo}
         onChange={(e) => setIdArchivo(e.target.value)}
         />
         <button
         onClick={handleAddRevista}
         className="bg-custom-blue py-2 rounded-md font-medium hover:bg-blue-600 transition"
         disabled={loading}
         >
            {loading ? 'Subiendo...' : 'Agregar Revista'}
         </button>
      </div>
   </DashboardLayout>
   );
};

export default Dashboard;