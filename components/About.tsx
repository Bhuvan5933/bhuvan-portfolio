
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section 
      id="about" 
      ref={containerRef} 
      style={{ opacity: sectionOpacity }}
      className="py-32 md:py-64 px-6 md:px-12 bg-[#050505] relative z-20 overflow-hidden -mt-12 md:-mt-24"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-[0.05] pointer-events-none select-none whitespace-nowrap z-0">
        <motion.h2 style={{ x: xText }} className="text-[40vw] md:text-[30vw] font-black tracking-tighter leading-none text-white stroke-text">
          INNOVATOR INNOVATOR
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            {/* Target for the "About" link */}
            <div className="flex items-center gap-4 mb-6 md:mb-8 scroll-mt-32">
               <span className="text-[10px] uppercase tracking-[1em] text-violet-500 font-black">Visual DNA</span>
               <div className="h-[1px] w-12 md:w-24 bg-zinc-800" />
            </div>
            
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-8 md:mb-12 leading-[1] md:leading-[0.9] text-white">
              Engineering <br />
              <span className="text-zinc-800">Pure Experience.</span>
            </h2>
            
            <p className="text-xl md:text-3xl font-light text-zinc-400 leading-relaxed border-l-2 border-violet-500/50 pl-6 md:pl-10 mb-10 md:mb-12 max-w-2xl italic">
              "Design is the silent ambassador of your brand. I make sure it speaks with authority and elegance."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-zinc-900/50">
               <div className="group">
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase mb-3 md:mb-4 group-hover:text-violet-400 transition-colors">Strategic UI</h4>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">System-thinking applied to visual interfaces.</p>
               </div>
               <div className="group">
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase mb-3 md:mb-4 group-hover:text-violet-400 transition-colors">Global Delivery</h4>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">2+ Years of high-impact brand solutions.</p>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
           <div className="aspect-[3/4] relative group max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 border border-violet-500/20 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 group-hover:translate-x-8 md:group-hover:translate-x-10 group-hover:translate-y-8 md:group-hover:translate-y-10 transition-transform duration-1000" />
              <div className="relative w-full h-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                <img 
                   src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" 
                   className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
                   alt="Studio Vibe"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent" />
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
      `}</style>
    </motion.section>
  );
};

export default About;
