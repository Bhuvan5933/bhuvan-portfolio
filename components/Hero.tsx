
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';

const CinematicGlobe: React.FC<{ mouseX: any; mouseY: any }> = ({ mouseX, mouseY }) => {
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 20 });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.2] hidden lg:block" style={{ perspective: "1200px" }}>
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[800px] h-[800px]"
      >
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={`long-${i}`}
              className="absolute inset-0 border-[0.5px] border-violet-500/30 rounded-full"
              style={{ transform: `rotateY(${i * 15}deg)` }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-violet-600/5 blur-[180px] rounded-full" />
      </motion.div>
    </div>
  );
};

const MagneticButton: React.FC<{ 
  children: React.ReactNode; 
  className: string; 
  href: string;
}> = ({ children, className, href }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Changed opacity to persist longer (up to 0.8 scroll progress)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-visible bg-[#050505] pt-24 pb-20 md:pt-0 md:pb-0"
    >
      {/* Background Grid - more subtle for premium feel */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <CinematicGlobe mouseX={mouseX} mouseY={mouseY} />

      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center lg:text-left"
      >
        <div className="order-2 lg:order-1 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
               <div className="w-8 h-[1px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-violet-400">Bhuvana Giri</span>
            </div>
            
            <h1 className="text-[15vw] sm:text-[12vw] lg:text-[9rem] font-black tracking-tighter leading-[0.85] md:leading-[0.75] text-white mb-6">
              VISUAL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600">MAGICIAN</span>
            </h1>

            <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 md:mb-12">
              Transforming complex technical structures into breathtaking visual stories.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6">
              <MagneticButton 
                href="#work" 
                className="group relative px-10 py-5 bg-white text-black font-black tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-4 overflow-hidden"
              >
                <span className="relative z-10">Launch Gallery</span>
                <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </MagneticButton>

              <MagneticButton 
                href="#contact" 
                className="px-10 py-5 border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl text-white font-black tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-4 hover:border-violet-500 transition-all"
              >
                <FileText size={14} className="text-violet-500" />
                Resume '25
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl"
          >
            <motion.img 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkQsxg8W47PMGOC2Q8yuQi2JvDqOmPgCoMpnQ3f2wb7hKkZPDigs6pFTDajPYHhL0ShWXtRxi6UZRUAYpuT9JXJuyKYklkZNiyb7WrrLbuLjoxvRLeOfPpeeKpFwrhBEk8i3vu-RcWCY2ENZ-S4F2MTSt1tNDBtmigyuKPD-WlArDFKZOiyQIk6_R_rsdF/s320/ChatGPT%20Image%2011,%20%E0%B0%9C%E0%B0%A8%202026%2007_36_11%20PM.png" 
              alt="Portrait"
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {/* Corner Decorative Frames */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 hidden sm:flex"
      >
        <span className="text-[8px] font-black tracking-[0.8em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-violet-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
