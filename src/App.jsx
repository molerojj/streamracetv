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

  // Rutas donde NO mostrar el Navbar
  const hideNavbarRoutes = ['/transmision', '/upload'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transmision" element={<Transmision />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
    </>
  );
};

export default App;