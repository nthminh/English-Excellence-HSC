import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { IMAGES } from '../constants/images';

export function About() {
  return (
    <div className="min-h-screen bg-[#e8e4d9]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        {/* Left Column - Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 p-8 md:p-16 lg:p-24 space-y-12"
        >
          <h1 className="text-7xl md:text-8xl font-sans font-bold text-black tracking-tight mb-12">
            About Us
          </h1>

          <div className="space-y-8 text-black text-lg md:text-xl leading-relaxed max-w-2xl">
            <p>
              We're built on a simple truth: English is the only subject in the HSC that every student must take, 
              and it must contribute to their ATAR. That makes it too important to be a "lagging" subject. 
              Yet for most students, English is also the hardest—because it's not about memorising content, 
              it's about learning how to write, refine, and rewrite. That's why our approach is unapologetically 
              strategic and relentlessly practical. We maximise the one thing that actually drives improvement: 
              <span className="font-bold"> writing</span>. Not once. Not occasionally. But consistently, deliberately, 
              and with detailed feedback—so each student can progress from exactly where they are.
            </p>

            <p>
              We don't believe in overnight fixes (they don't exist). We believe in systems: personalised and 
              clear feedback loops that turn effort into measurable, real improvement. Our students write more, 
              receive more guidance, and learn how to edit their own thinking with precision. Because in a 
              subject as competitive and as decisive as English, progress is never accidental.
            </p>

            <p>
              But we also understand what sits beneath the marks. We know how heavy these final years can feel, 
              for both students and parents. We know how much pressure is wrapped up in results, rankings, and 
              futures that seem to hinge on a single number. And we also know that this period, difficult as it is, 
              is a rare opportunity: not just to compete, but to <span className="font-bold">grow</span> in discipline, 
              confidence, and self-belief. At English Excellence, we don't just teach English. We support students 
              through one of the most demanding chapters of their lives, with clarity, structure, and genuine 
              care—so they don't just improve their results, but emerge stronger for what comes next.
            </p>
          </div>
        </motion.div>

        {/* Right Column - Quote and Profile */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-[45%] bg-[#02074d] p-8 md:p-16 lg:p-24 flex flex-col justify-between text-white relative overflow-hidden"
        >
          <div className="space-y-12 relative z-10">
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight">
              "I believe I can make Excellent Results accessible to everyone and anyone"
            </blockquote>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-3xl md:text-4xl font-serif text-white">
                  Leo Bui
                </p>
                <p className="text-lg md:text-xl text-white/80 font-sans">
                  Founder & Head Tutor | English Excellence
                </p>
                <div className="text-base md:text-lg text-white/70 font-sans pt-2">
                  <p className="hover:text-[#c5a059] transition-colors cursor-pointer">Leo@eehsc.com</p>
                  <p>0431 878 221</p>
                </div>
              </div>
              <div className="w-32 h-1 bg-[#c5a059]" />
            </div>
          </div>

          <div className="mt-20 relative self-end lg:self-auto">
            <div className="relative inline-block">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src={IMAGES.founder} 
                  alt="Leo Bui - Founder" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 scale-75 md:scale-100">
                <Logo size={160} />
              </div>
            </div>
          </div>

          {/* Background Decorative Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.03] pointer-events-none select-none whitespace-nowrap z-0">
            EXCELLENCE
          </div>
        </motion.div>
      </div>
    </div>
  );
}
