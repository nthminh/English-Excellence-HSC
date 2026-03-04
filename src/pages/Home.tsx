import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, BookOpen, Award, FileText, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants/images';

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-navy text-cream pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5 text-9xl font-extrabold text-cream/50 select-none pointer-events-none flex items-center justify-center">
          <span className="-translate-x-1/4">EXCELLENCE</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-gold font-sans mb-2">Admin@eehsc.com</p>
              <p className="text-2xl text-gold font-sans mb-4">0431 878 221</p>
              <div className="h-0.5 w-32 bg-gold mb-6"></div>
              <h1
                className="text-5xl md:text-6xl font-sans font-bold leading-[1.1] mb-8 text-gold text-center"
              >
                HSC English tutoring that guarantees improvement
              </h1>
              <p className="text-xl text-cream/70 mb-10 leading-relaxed max-w-xl">
                Do not let English hold back your ATAR.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/inquiry"
                  className="bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center group"
                >
                  Book Your Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="w-[500px] xl:w-[600px] rounded-3xl shadow-2xl overflow-hidden bg-gold/10 hover:-translate-y-2 transition-transform duration-300">
                  <img
                    src={IMAGES.hero}
                    alt="Tutoring Session"
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cream py-20 border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Improvement Rate in 2025', value: '100%' },
              { label: 'Average ATAR', value: '92.8' },
              { label: 'Years Experience', value: '8+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-navy mb-2">{stat.value}</div>
                <div className="text-sm text-navy/60 font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">The English Excellence Advantage</h3>
            <p className="text-navy/60 text-lg leading-relaxed">
              Most of our students have tried tutoring before, but few have experienced a programme designed for measurable improvement. Which is why when students join a programme, they always stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="text-gold" size={32} />,
                title: 'Personalised Programmes',
                desc: 'We focus on your child’s internal school assessments and schedule to help them improve their ranks at school.',
              },
              {
                icon: <CheckCircle className="text-gold" size={32} />,
                title: 'Unlimited Feedback',
                desc: 'Your child can send in writing and get feedback regularly, outside of lessons. This helps them improve faster.',
              },
              {
                icon: <FileText className="text-gold" size={32} />,
                title: 'Day-to-day reporting',
                desc: 'To build transparency and accountability, we provide updates so you know what was covered, what needs work, and how your child is progressing.',
              },
              {
                icon: <Repeat className="text-gold" size={32} />,
                title: 'Tutor Continuity',
                desc: 'Unlike other tutoring centres, your child works with one tutor who understands their strengths, weaknesses, and goals over time.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-3xl border border-navy/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-serif font-bold text-navy mb-4">{feature.title}</h4>
                <p className="text-navy/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
