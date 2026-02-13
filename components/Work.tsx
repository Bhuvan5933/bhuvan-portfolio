
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { 
  Smartphone, 
  Palette, 
  Figma as FigmaIcon, 
  Image as ImageIcon, 
  ChevronRight, 
  ChevronLeft,
  MousePointer2,
  Filter
} from 'lucide-react';

const TOOL_CONFIG: Record<string, { icon: any, color: string }> = {
  'Canva': { icon: Smartphone, color: 'hover:bg-[#00C4CC]' },
  'Photoshop': { icon: ImageIcon, color: 'hover:bg-[#31A8FF]' },
  'Illustrator': { icon: Palette, color: 'hover:bg-[#FF9A00]' },
  'Figma': { icon: FigmaIcon, color: 'hover:bg-[#F24E1E]' }
};

const TOOLS = [
  { name: 'All', icon: MousePointer2 },
  { name: 'Canva', icon: Smartphone },
  { name: 'Photoshop', icon: ImageIcon },
  { name: 'Illustrator', icon: Palette },
  { name: 'Figma', icon: FigmaIcon }
];

const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0], 
  handleToolClick: (e: React.MouseEvent, tool: string) => void 
}> = ({ project, handleToolClick }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -50 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex-none w-[85vw] md:w-[600px] snap-center py-12"
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onClick={() => navigate(`/project/${project.id}`)}
        className="block cursor-pointer group/card relative aspect-video md:aspect-[16/10] overflow-hidden bg-zinc-900 border border-zinc-800/50 hover:border-violet-500/40 transition-all duration-700 shadow-2xl rounded-sm"
      >
        <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }} className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-[0.6] group-hover/card:grayscale-0 group-hover/card:scale-105 group-hover/card:brightness-100 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        </div>

        <div style={{ transform: "translateZ(90px)" }} className="absolute bottom-10 left-10 right-10 z-10">
          <div className="flex gap-2 mb-4">
            {project.tools.map(toolName => (
              <span key={toolName} className="text-[8px] font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md text-white px-2 py-1 border border-white/5">
                {toolName}
              </span>
            ))}
          </div>

          <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-2 group-hover/card:text-violet-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-violet-500"></span>
            {project.category}
          </p>
        </div>

        <div style={{ transform: "translateZ(110px)" }} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-500 shadow-xl">
          <ChevronRight size={20} strokeWidth={2} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [activeTool, setActiveTool] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const filteredProjects = useMemo(() => {
    return activeTool === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.tools.includes(activeTool));
  }, [activeTool]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleToolClick = (e: React.MouseEvent, toolName: string) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveTool(toolName);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.8em] text-violet-500 font-black mb-4 block"
          >
            Curated Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-16"
          >
            SELECTED WORK
          </motion.h2>
          
          {/* Refined Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 items-center bg-zinc-900/40 p-1.5 border border-zinc-800/50 backdrop-blur-3xl rounded-full shadow-2xl"
          >
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setActiveTool(tool.name)}
                  className={`flex items-center gap-2.5 px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full ${
                    isActive 
                      ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)] scale-105' 
                      : 'text-zinc-500 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon size={12} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-violet-600' : 'text-zinc-600'} />
                  {tool.name}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Horizontal Reel Container */}
        <div className="relative group/reel">
          <motion.div 
            ref={scrollContainerRef}
            className="flex gap-10 overflow-x-auto pb-10 pt-4 scrollbar-hide snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', perspective: "2000px" }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  handleToolClick={handleToolClick} 
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none flex justify-between px-2 z-20">
            <button 
              onClick={scrollLeft}
              className="w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center text-zinc-400 pointer-events-auto hover:bg-white hover:text-black hover:scale-110 transition-all duration-500 shadow-2xl opacity-0 group-hover/reel:opacity-100 -translate-x-2 group-hover/reel:translate-x-0"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center text-zinc-400 pointer-events-auto hover:bg-white hover:text-black hover:scale-110 transition-all duration-500 shadow-2xl opacity-0 group-hover/reel:opacity-100 translate-x-2 group-hover/reel:translate-x-0"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dynamic Showcase Counter */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-black tracking-[0.4em] text-zinc-700 uppercase">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={10} className="text-violet-500" />
              <span>Filtering By:</span>
            </div>
            <span className="text-zinc-400 border-b border-zinc-800 pb-1">{activeTool}</span>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-zinc-900"></span>
            <span>{filteredProjects.length} Result{filteredProjects.length !== 1 ? 's' : ''} Found</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
