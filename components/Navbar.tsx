
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'RESUME', href: '#contact' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const isHome = location.pathname === '/';

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const handleNavClick = (e: React.MouseEvent, href: string, name: string) => {
    if (name === 'RESUME') {
      // In production, this would open your PDF
      // alert("Opening Resume...");
    }
    
    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
          isScrolled || isOpen ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent'
        }`}
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity z-10">
          BHUVANA<span className="text-violet-500">_</span>GIRI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 text-[10px] font-black tracking-[0.3em]">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={isHome ? item.href : `/${item.href}`}
              onClick={(e) => handleNavClick(e, item.href, item.name)}
              className={`transition-all relative group py-2 ${
                item.name === 'RESUME' ? 'text-violet-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] bg-violet-500 transition-all duration-300 group-hover:w-full ${
                item.name === 'RESUME' ? 'shadow-[0_0_10px_#8b5cf6] w-1/3' : ''
              }`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-[110] relative p-2 text-white outline-none"
        >
          {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[105] flex flex-col justify-center px-10"
          >
            <div className="space-y-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={`block text-5xl sm:text-6xl font-black tracking-tighter transition-colors ${
                    item.name === 'RESUME' ? 'text-violet-500' : 'text-white active:text-violet-400'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-10 right-10 flex justify-between items-end border-t border-zinc-900 pt-8"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mb-3">Connect</p>
                <div className="flex gap-5 text-sm font-bold text-zinc-400">
                  <a href="mailto:bhuvanoptimistic@gmail.com" className="hover:text-white transition-colors">ML</a>
                  <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LN</a>
                  <a href="https://bhuvangiri593create.github.io/" target="_blank" className="hover:text-white transition-colors">GH</a>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-800 font-bold">Bhuvana Giri &copy; 2025</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
