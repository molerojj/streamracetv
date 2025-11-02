import React from 'react';

const DashboardLayout = ({ user, children }) => {
   return (
      <div className="min-h-screen bg-neutral-950 text-white">
         <header className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-neutral-900">
            <h1 className="text-2xl font-semibold text-custom-purple">
            Stream Race TV
            </h1>
            <div className="flex items-center gap-4">
               <span className="text-neutral-400">Hola, {user.name}</span>
               <button
               onClick={user.logout}
               className="text-sm border border-custom-blue px-3 py-1 rounded hover:bg-custom-blue hover:text-black transition"
               >
               Cerrar sesión
               </button>
            </div>
         </header>
         <main className="p-6">{children}</main>
      </div>
   );
};

export default DashboardLayout;