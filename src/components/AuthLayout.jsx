import React from 'react';

const AuthLayout = ({ children }) => {
   return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white px-4">
         <div className="max-w-md w-full shadow-lg rounded-lg bg-neutral-900 p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Bienvenido a{" "}
            <span className="bg-custom-purple text-transparent bg-clip-text">
            Stream Race TV
            </span>
            </h2>
            <p className="text-center text-neutral-500 mt-2 mb-6">
            Inicia sesión para continuar
            </p>
            {children}
         </div>
      </div>
   );
};

export default AuthLayout;