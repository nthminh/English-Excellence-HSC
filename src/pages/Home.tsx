import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { IMAGES } from '../constants/images';

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy text-cream pt-20 pb-32">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#d8a444_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1 mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Premium HSC Tutoring</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
                One-on-one HSC English tutoring that <span className="text-gold italic underline decoration-gold/30 underline-offset-8">guarantees improvement</span>... otherwise its free
              </h1>
              <p className="text-xl text-cream/70 mb-10 leading-relaxed max-w-xl">
                Unlock your potential with personalized strategies, expert feedback, and a proven track record of Band 6 results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/inquiry"
                  className="bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center group"
                >
                  Book Your Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/resources"
                  className="border border-cream/20 hover:border-gold/50 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
                >
                  Explore Free Resources
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-navy bg-gold/20 flex items-center justify-center overflow-hidden">
                      <img src={IMAGES.studentPlaceholder(i)} alt="Student" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-gold mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-cream/60 font-medium">Trusted by 500+ HSC students</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-gold/20 shadow-2xl">
                <img
                  src={IMAGES.hero}
                  alt="Tutoring Session"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-cream/10 backdrop-blur-md border border-cream/20 rounded-2xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Logo size={48} />
                      <div>
                        <h4 className="font-serif font-bold text-lg">99.95 ATAR Mentor</h4>
                        <p className="text-xs text-cream/60 uppercase tracking-widest">Expert Guidance</p>
                      </div>
                    </div>
                    <p className="text-sm text-cream/80 italic">
                      "Our students don't just learn English; they master the art of critical thinking and sophisticated analysis required for Band 6 success."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cream py-20 border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Band 6 Results', value: '92%' },
              { label: 'Students Tutored', value: '1,200+' },
              { label: 'Average ATAR', value: '95.4' },
              { label: 'Years Experience', value: '10+' },
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
              We provide a comprehensive ecosystem designed to support students through every challenge of the HSC English curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="text-gold" size={32} />,
                title: 'Personalized 1-on-1',
                desc: 'Every student is unique. We tailor our teaching style and focus areas to match your specific strengths and weaknesses.'
              },
              {
                icon: <BookOpen className="text-gold" size={32} />,
                title: 'Exclusive Resources',
                desc: 'Gain access to our library of Band 6 essays, detailed text guides, and marked responses with examiner feedback.'
              },
              {
                icon: <CheckCircle className="text-gold" size={32} />,
                title: 'Unlimited Feedback',
                desc: 'Submit your drafts anytime. We provide detailed, line-by-line feedback within 24-48 hours to ensure rapid improvement.'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-white rounded-3xl border border-navy/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
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

      {/* CTA Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 skew-x-12 transform translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gold rounded-[3rem] p-12 md:p-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6 leading-tight">
                Ready to transform your English results?
              </h2>
              <p className="text-navy/80 text-xl font-medium">
                Book a free 30-minute trial session today and see the difference expert guidance makes.
              </p>
            </div>
            <Link
              to="/inquiry"
              className="bg-navy text-cream px-10 py-5 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-2xl flex items-center group whitespace-nowrap"
            >
              Get Started Now
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
