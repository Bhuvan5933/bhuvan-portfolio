
import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { SKILL_GROUPS } from '../constants';

const SkillCard: React.FC<{ group: typeof SKILL_GROUPS[0], index: number }> = ({ group, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const gridSpan = index === 0 ? 'md:col-span-2 md:row-span-1' : index === 3 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-sm border border-zinc-800 bg-zinc-900/10 p-8 transition-all duration-500 hover:border-violet-500/30 ${gridSpan}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-violet-400 transition-colors">
            {group.title}
          </span>
          <div className="w-1.5 h-1.5 bg-violet-500/50 rounded-full animate-pulse" />
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 bg-black/40 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-40 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.8em] text-blue-500 font-black mb-6 block scroll-mt-32"
            >
              Tooling & Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
            >
              THE <span className="text-zinc-800">TECHNICAL</span> <br /> ARSENAL
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
             <p className="text-zinc-500 text-sm font-light max-w-sm ml-auto leading-relaxed italic">
               Blending aesthetic intuition with technical rigor to deliver production-ready design assets.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
