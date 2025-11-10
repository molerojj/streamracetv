import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadPage from './components/Upload';
import Home from './pages/Home';
import Transmision from './pages/Transmision';
import AnimatedPage from './components/AnimatedPage';

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

  const routeConfig = {
    '/': { navbar: true, footer: true },
    '/transmision': { navbar: false, footer: true },
    '/upload': { navbar: false, footer: false },
  };

  const config = routeConfig[path] || { navbar: false, footer: false };

  return (
    <>
      {config.navbar && <Navbar />}

      {/* Rutas animadas */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/transmision"
            element={
              <AnimatedPage>
                <Transmision />
              </AnimatedPage>
            }
          />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </AnimatePresence>

      {config.footer && <Footer />}
    </>
  );
};

export default App;