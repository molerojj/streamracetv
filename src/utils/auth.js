import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export { auth };