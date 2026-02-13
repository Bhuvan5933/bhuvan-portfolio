
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import GrainOverlay from './components/GrainOverlay';
import Navbar from './components/Navbar';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#050505] selection:bg-violet-500/30 overflow-x-hidden cursor-auto">
        <GrainOverlay />
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<CaseStudy />} />
          </Routes>
        </AnimatePresence>
      </div>
    </HashRouter>
  );
};

export default App;
