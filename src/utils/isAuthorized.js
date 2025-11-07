import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const isAuthorized = async (email) => {
  try {
    const ref = doc(db, 'usuarios_autorizados', email);
    const docSnap = await getDoc(ref);
    return docSnap.exists(); // Devuelve true si el email está en Firestore
  } catch (error) {
    console.error('Error verificando acceso:', error);
    return false;
  }
};