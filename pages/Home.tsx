
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Journey from '../components/Journey';

const Home: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Hero />
      <div className="relative z-10">
        <About />
        <Journey />
        <Work />
        <Skills />
        <Contact />
      </div>
      
      <footer className="py-16 px-6 md:px-12 text-center border-t border-zinc-900 bg-[#050505] relative z-20">
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
          &copy; 2025 BHUVANA GIRI. ALL RIGHTS RESERVED. <br />
          <span className="mt-3 block text-violet-500/50">VISUAL STORYTELLING & DIGITAL ARCHITECTURE</span>
        </p>
      </footer>
    </motion.main>
  );
};

export default Home;
