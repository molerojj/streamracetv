import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

// Iniciar sesión con popup
export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Cerrar sesión
export const logout = () => {
  return signOut(auth);
};

export { auth };