
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const RevealSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create a smooth scroll-driven entrance and exit
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; ratio?: string }> = ({ src, alt, ratio = "aspect-video" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // More nuanced parallax and scaling
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <div ref={ref} className={`relative ${ratio} bg-zinc-900 overflow-hidden border border-zinc-800`}>
      <motion.img 
        style={{ y, scale, opacity: imageOpacity }}
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const CaseStudy: React.FC = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  
  const containerRef = useRef(null);
  const { scrollYProgress: pageProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(pageProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!project) return <div className="h-screen flex items-center justify-center">Project not found</div>;

  // Background dynamics based on project color
  const projectColor = project.color || '#8B5CF6';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050505] relative"
    >
      {/* Dynamic Cinematic Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blurred Project Image Base */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 scale-125 grayscale brightness-50 blur-[100px]"
          style={{ 
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: useTransform(pageProgress, [0, 1], [0, -100])
          }}
        />

        {/* Floating Gradient Blobs that use Project Color */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] blur-[150px] rounded-full opacity-10"
          style={{ backgroundColor: projectColor }}
        />

        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, -150, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] blur-[180px] rounded-full opacity-[0.15]"
          style={{ backgroundColor: projectColor }}
        />

        {/* Global Grain/Noise on top of background */}
        <div className="absolute inset-0 bg-neutral-950/20 mix-blend-overlay" />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[110]"
        style={{ 
          scaleX: smoothProgress,
          backgroundColor: projectColor
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-end px-6 md:px-12 pb-24 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: useTransform(pageProgress, [0, 0.5], [0, 300]),
            scale: useTransform(pageProgress, [0, 0.5], [1, 1.1]),
            opacity: useTransform(pageProgress, [0, 0.4], [1, 0])
          }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Return to Gallery</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.5em] mb-6 block" style={{ color: projectColor }}>Case Study // 01</span>
            <h1 className="text-7xl md:text-[10rem] font-extrabold tracking-tighter leading-none mb-6 mix-blend-difference">{project.title}</h1>
            <div className="h-[1px] w-24 mb-8" style={{ backgroundColor: projectColor }} />
            <p className="text-2xl font-light text-zinc-400 max-w-2xl tracking-tight">{project.category}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 py-48 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-48 border-y border-zinc-900/50 py-16 backdrop-blur-sm">
               <div className="space-y-2">
                 <h4 className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Role</h4>
                 <p className="font-medium text-zinc-200">Creative Lead</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Timeline</h4>
                 <p className="font-medium text-zinc-200">12 Weeks</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Scope</h4>
                 <p className="font-medium text-zinc-200">UI / Branding</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Year</h4>
                 <p className="font-medium text-zinc-200">2024</p>
               </div>
            </div>
          </RevealSection>

          <div className="space-y-64">
            {/* The Challenge */}
            <RevealSection>
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold sticky top-32" style={{ color: projectColor }}>The Vision</h2>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 leading-tight text-white">Solving through simplicity.</h3>
                  <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                    Modern users are bombarded with noise. Our goal was to strip away the non-essential, leaving a digital environment that prioritizes focus and clarity without sacrificing visual richness.
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* Process Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ParallaxImage 
                src={`https://picsum.photos/seed/${project.id}-process/1200/800`} 
                alt="Exploratory process" 
              />
            </motion.div>

            {/* Strategy Grid */}
            <div className="grid md:grid-cols-2 gap-32 items-center">
              <RevealSection>
                <div className="space-y-12">
                  <h2 className="text-4xl font-bold tracking-tighter leading-tight text-white">Bridging the gap between code and canvas.</h2>
                  <div className="space-y-8 text-lg text-zinc-400 font-light leading-relaxed">
                    <p>
                      The design system was built with modularity at its core. Every component follows a strict mathematical grid, ensuring consistency across a dozen unique user journeys.
                    </p>
                    <p>
                      We developed a custom typography scale that dynamically responds to user context, maintaining perfect legibility across all device fragments.
                    </p>
                  </div>
                </div>
              </RevealSection>
              
              <div className="space-y-6">
                {[
                  { title: 'Audience Insight', accent: projectColor },
                  { title: 'Visual DNA', accent: projectColor },
                  { title: 'Interaction Design', accent: projectColor }
                ].map((item, i) => (
                  <RevealSection key={item.title}>
                    <div className={`p-10 border border-zinc-900 group transition-all duration-700 hover:border-zinc-700 relative overflow-hidden bg-black/20 backdrop-blur-md`}>
                      <div 
                        className="absolute top-0 right-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                        style={{ backgroundColor: item.accent }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 block mb-4 group-hover:text-zinc-400">Phase 0{i + 1}</span>
                      <p className="text-xl font-medium tracking-tight group-hover:text-white transition-colors text-zinc-300">{item.title}</p>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>

            {/* Result Section */}
            <RevealSection>
              <div className="space-y-24">
                <div className="max-w-3xl">
                  <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold mb-8" style={{ color: projectColor }}>The Outcome</h2>
                  <p className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-12 text-white">
                    A visual benchmark for the next decade of digital interaction.
                  </p>
                  <p className="text-xl text-zinc-500 font-light max-w-2xl leading-relaxed">
                    Post-launch metrics showed a significant uplift in engagement, validating the unconventional decision to lean into a minimal, high-contrast aesthetic.
                  </p>
                </div>
                <ParallaxImage 
                  src={`https://picsum.photos/seed/${project.id}-final/1500/800`} 
                  alt="Final interface reveal" 
                  ratio="aspect-[21/9]"
                />
              </div>
            </RevealSection>
          </div>

          {/* Footer Navigation */}
          <RevealSection>
            <div className="mt-64 pt-32 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-12 backdrop-blur-sm">
              <Link to="/" className="flex items-center gap-6 group">
                 <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
                    <ArrowLeft size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-1">Go Back</span>
                    <span className="text-sm font-bold tracking-widest uppercase text-white">Project Overview</span>
                  </div>
              </Link>
              
              <div className="text-center md:text-right">
                 <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-700 font-bold mb-2">Next Concept</p>
                 <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-white transition-colors uppercase flex items-center gap-3 text-zinc-400" style={{ '--hover-color': projectColor } as any}>
                    <span>Aether Identity</span>
                    <ArrowRight size={24} style={{ color: projectColor }} />
                 </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </motion.div>
  );
};

export default CaseStudy;
