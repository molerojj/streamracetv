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

  // Rutas donde NO mostrar Navbar y Footer
  const hideHeaderFooterRoutes = ['/upload'];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transmision" element={<Transmision />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;