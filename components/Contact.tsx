
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, MapPin, Phone, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.5em] text-violet-500 font-bold mb-4 block scroll-mt-32">Collaboration</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-12">
              LET'S CREATE <br /> IMPACTFUL <br /> <span className="text-zinc-800">VISUALS.</span>
            </h2>

            <div className="space-y-8">
              <div className="group cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2 font-bold">Primary Email</span>
                <a href="mailto:bhuvanoptimistic@gmail.com" className="text-2xl md:text-3xl font-light hover:text-violet-500 transition-colors text-zinc-200">bhuvanoptimistic@gmail.com</a>
              </div>

              <div className="flex flex-col gap-6 text-zinc-400">
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-violet-500" />
                  <span className="text-lg font-light">+91 6302045599</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={18} className="text-violet-500" />
                  <span className="text-lg font-light">Visakhapatnam, Andhra Pradesh, India</span>
                </div>
              </div>

              {/* Resume Card in Contact Section */}
              <motion.a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume Download Initiated (Placeholder)");
                }}
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 p-6 border border-zinc-800 bg-zinc-900/40 hover:border-violet-500/40 transition-all duration-500 group/res mt-4"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-violet-500/10 text-violet-500 group-hover/res:bg-violet-500 group-hover/res:text-white transition-all">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">Credentials</p>
                  <p className="text-sm font-bold tracking-widest uppercase text-zinc-200">Download My Resume</p>
                </div>
              </motion.a>

              <div className="flex gap-8 pt-8 border-t border-zinc-900">
                {[
                  { icon: Linkedin, url: 'https://linkedin.com' },
                  { icon: Github, url: 'https://bhuvangiri593create.github.io/' },
                  { icon: Mail, url: 'mailto:bhuvanoptimistic@gmail.com' }
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: '#8B5CF6' }}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <item.icon size={24} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-zinc-900/10 p-8 md:p-12 border border-zinc-900 backdrop-blur-md">
              <h3 className="text-xl font-bold tracking-tight mb-8 text-white uppercase tracking-widest">Inquiry</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-violet-500 transition-colors text-lg md:text-xl font-light text-zinc-200"
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com"
                    className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-violet-500 transition-colors text-lg md:text-xl font-light text-zinc-200"
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">Your Message</label>
                  <textarea 
                    rows={3}
                    placeholder="Project Brief"
                    className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-violet-500 transition-colors text-lg md:text-xl font-light resize-none text-zinc-200"
                  />
                </div>

                <button className="flex items-center gap-4 group mt-8 w-full md:w-auto">
                  <span className="text-[10px] font-black tracking-widest uppercase text-zinc-200">Send Transmission</span>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
