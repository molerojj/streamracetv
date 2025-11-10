import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadPage from './components/Upload';
import Home from './pages/Home';
import Transmision from './pages/Transmision';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Mostrar Navbar solo en la ruta raíz
  const showNavbar = path === '/';

  // Mostrar Footer en / y /transmision
  const showFooter = path === '/' || path === '/transmision';

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transmision" element={<Transmision />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

export default App;