import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
const handleGoogleLogin = async () => {
// Aquí va tu lógica de Firebase/Auth
console.log('Iniciar sesión con Google');
};

return (
   <AuthLayout>
      <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-4 w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-100 transition"
      >
      <FcGoogle size={24} />
      Iniciar sesión con Google
      </button>
   </AuthLayout>
   );
};

export default Login;