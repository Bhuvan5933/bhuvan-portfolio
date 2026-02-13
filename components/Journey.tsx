
import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { JOURNEY_ITEMS } from '../constants';

const Particle: React.FC<{ 
  index: number; 
  mouseX: any; 
  mouseY: any 
}> = ({ index, mouseX, mouseY }) => {
  // Randomize initial properties for each particle
  const initialX = useMemo(() => Math.random() * 100, []);
  const initialY = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => Math.random() * 4 + 2, []);
  const duration = useMemo(() => Math.random() * 20 + 20, []);
  const delay = useMemo(() => Math.random() * -20, []);
  const sensitivity = useMemo(() => Math.random() * 20 + 10, []);

  // Mouse reactivity: subtle offset based on mouse position
  const xOffset = useTransform(mouseX, [-500, 500], [-sensitivity, sensitivity]);
  const yOffset = useTransform(mouseY, [-500, 500], [-sensitivity, sensitivity]);

  return (
    <motion.div
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        width: size,
        height: size,
        x: xOffset,
        y: yOffset,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="absolute rounded-full bg-violet-400/40 blur-[1px] shadow-[0_0_10px_rgba(139,92,246,0.3)] pointer-events-none"
    />
  );
};

const MilestoneCard: React.FC<{ item: typeof JOURNEY_ITEMS[0], index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex w-full mb-24 md:mb-40 ${isEven ? 'justify-start' : 'justify-end'}`}>
      {/* Central Marker on the line with Enhanced Pulse */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 hidden md:block">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="relative w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.8)] border-4 border-[#050505]"
        >
          {/* Core Inner Glow */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-white rounded-full blur-[1px]"
          />

          {/* Expanding Cinematic Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 3 + i], 
                opacity: [0.6, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 1.3,
                ease: "easeOut" 
              }}
              className="absolute inset-0 bg-violet-500/30 rounded-full blur-[4px]"
            />
          ))}

          {/* Static Ambient Halo */}
          <div className="absolute inset-[-8px] bg-violet-500/10 rounded-full blur-xl animate-pulse" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`w-full md:w-[45%] group`}
      >
        <div className="relative p-8 md:p-12 border border-zinc-800 bg-zinc-900/10 backdrop-blur-xl group-hover:border-violet-500/40 transition-all duration-700 overflow-hidden">
          {/* Soft Exterior Glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/10 to-blue-600/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-[0.5em] text-violet-500 font-bold group-hover:text-violet-400 transition-colors duration-500">{item.phase}</span>
              <span className="text-zinc-500 font-mono text-xs group-hover:text-zinc-400 transition-colors duration-500">{item.year}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2 group-hover:text-white transition-colors duration-500">{item.title}</h3>
            <p className="text-zinc-600 text-sm mb-6 font-medium italic group-hover:text-zinc-500 transition-colors duration-500">{item.location}</p>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base group-hover:text-zinc-300 transition-colors duration-500">
              {item.description}
            </p>
          </div>
          
          {/* Cinematic Edge Highlight Glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          {/* Base Inner Glow */}
          <div className="absolute -inset-2 bg-violet-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

const Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Mouse Tracking for Particles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const particlesCount = 20;

  return (
    <section 
      id="journey" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden"
    >
      {/* Cinematic Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(particlesCount)].map((_, i) => (
          <Particle key={i} index={i} mouseX={smoothMouseX} mouseY={smoothMouseY} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center md:text-left relative z-10"
        >
          <span className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold mb-4 block">Chronology</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">MY JOURNEY</h2>
        </motion.div>

        {/* The Timeline Line Container */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[220px] bottom-0 w-[2px] bg-zinc-900/50 hidden md:block">
          {/* The Active Drawing Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-blue-500 via-violet-500 to-violet-400 origin-top shadow-[0_0_20px_rgba(139,92,246,0.4)] relative"
          >
            {/* The Glowing Lead Tip */}
            <motion.div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-400 rounded-full blur-[2px] shadow-[0_0_15px_#a78bfa,0_0_30px_#8b5cf6]"
            >
               <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50" />
            </motion.div>
          </motion.div>
        </div>

        {/* Milestone Items */}
        <div className="relative z-10">
          {JOURNEY_ITEMS.map((item, index) => (
            <MilestoneCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Call to action within journey */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center relative z-10"
        >
          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">Continuously Evolving</p>
          <div className="w-12 h-[1px] bg-zinc-800 mx-auto" />
        </motion.div>
      </div>
      
      {/* Decorative Spatial Elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Journey;
