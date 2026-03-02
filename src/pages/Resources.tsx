import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, CheckCircle, ArrowRight, Loader2, BookOpen, MessageSquare, Award, Users } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resources = [
  {
    title: 'Band 6 Essay Guide',
    type: 'Guide',
    desc: 'The ultimate structure for any HSC English essay. Includes sentence starters and analysis templates.',
    category: 'Guides'
  },
  {
    title: 'Common Module: Sample Response',
    type: 'Essay',
    desc: 'A full-mark response for "Texts and Human Experiences" with detailed examiner annotations.',
    category: 'Essays'
  },
  {
    title: 'Module A: Comparative Analysis',
    type: 'Marked Response',
    desc: 'Real student work marked by a senior examiner, showing exactly what distinguishes a Band 6.',
    category: 'Marked Responses'
  },
  {
    title: 'Creative Writing Toolkit',
    type: 'Feedback',
    desc: 'A collection of feedback on common creative writing pitfalls and how to avoid them.',
    category: 'Feedback'
  }
];

export function Resources() {
  const [signupName, setSignupName] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupLoading, setSignupLoading] = React.useState(false);
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [signupError, setSignupError] = React.useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError(null);
    try {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await addDoc(collection(db, 'resource_signups'), {
          name: signupName,
          email: signupEmail,
          createdAt: serverTimestamp(),
        });
      } else {
        console.warn('Firebase not configured. Signup simulated.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setSignupSuccess(true);
      setSignupName('');
      setSignupEmail('');
    } catch (err) {
      console.error('Error saving signup:', err);
      setSignupError('Unable to save your signup. Please check your connection and try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
        <img src="https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/logogray.png?alt=media&token=a7fca0d1-c096-459f-9ccd-faf66a81a68e" alt="Gray Logo" style={{width: 80, height: 'auto'}} className="mx-auto mb-6 logo-spin" />
          <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Free Resources</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">Master the HSC with <span className="text-gold italic">Expert Materials</span></h1>
          <p className="text-navy/60 text-xl leading-relaxed">
            Sign up to access our curated library of guides, essays, marked responses, and feedback. Everything you need to start your journey to Band 6.
          </p>
        </div>

        {/* FREE Book Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 bg-navy rounded-[3rem] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Book Image Area */}
            <div className="relative flex items-center justify-center p-12 bg-navy/95 min-h-[420px]">
              <div className="absolute inset-0 bg-gold/5 rounded-l-[3rem]" />
              {/* Placeholder book cover — replace src with your actual book image URL */}
              <div className="relative z-10 group">
                <div className="w-56 h-72 bg-cream/10 border-2 border-dashed border-gold/40 rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-2xl group-hover:border-gold/70 transition-all cursor-pointer">
                  <BookOpen className="text-gold mb-4" size={48} />
                  <p className="text-cream/60 text-sm font-sans leading-relaxed">
                    Add your book cover image here
                  </p>
                  <p className="text-gold/60 text-xs mt-2 font-sans">
                    Replace this placeholder with your image
                  </p>
                </div>
                {/* FREE badge */}
                <div className="absolute -top-4 -right-4 bg-gold text-navy font-sans font-black text-sm px-4 py-2 rounded-full shadow-lg rotate-6 uppercase tracking-widest">
                  FREE
                </div>
              </div>
            </div>

            {/* Stats & Info Area */}
            <div className="p-12 flex flex-col justify-center bg-navy">
              <div className="mb-2">
                <span className="text-gold font-sans font-black text-xs uppercase tracking-[0.35em]">Completely Free</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-3 leading-tight">
                FREE HSC <span className="text-gold italic">Resources</span>
              </h2>
              <p className="text-cream/60 font-sans text-base mb-8 leading-relaxed">
                Everything you need to excel in HSC English — written by tutors, built for students, and 100% free.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <BookOpen size={20} />, value: '300+', label: 'Pages of Content' },
                  { icon: <FileText size={20} />, value: '40+', label: 'Example Responses' },
                  { icon: <MessageSquare size={20} />, value: '600+', label: 'Feedback Comments' },
                  { icon: <Award size={20} />, value: '✓', label: 'Mark Values Included' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-cream/5 border border-cream/10 rounded-2xl p-4 flex items-start gap-3">
                    <span className="text-gold mt-0.5">{stat.icon}</span>
                    <div>
                      <p className="text-cream font-sans font-black text-xl leading-none">{stat.value}</p>
                      <p className="text-cream/50 font-sans text-xs mt-1 leading-snug">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-cream/60 font-sans text-sm">
                <Users size={16} className="text-gold" />
                <span>Written by <span className="text-gold font-semibold">tutors</span> for students</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {resources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-navy/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                  <FileText size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-navy/40 bg-navy/5 px-3 py-1 rounded-full">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-3 group-hover:text-gold transition-colors">{resource.title}</h3>
              <p className="text-navy/60 mb-8 leading-relaxed">{resource.desc}</p>
              <button className="flex items-center text-navy font-bold group-hover:text-gold transition-colors">
                Download Resource <Download className="ml-2" size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sign up form for resources */}
        <div className="bg-navy rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-cream mb-6 leading-tight">
                Get full access to our <span className="text-gold italic">Resource Library</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Weekly Band 6 essay breakdowns',
                  'Exclusive text analysis guides',
                  'Marked responses with examiner notes',
                  'Monthly HSC strategy webinars'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-cream/80">
                    <CheckCircle className="text-gold mr-3" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream/5 backdrop-blur-md border border-cream/10 p-8 rounded-3xl">
              {signupSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-gold mx-auto mb-4" size={48} />
                  <p className="text-cream font-bold text-lg">You're in!</p>
                  <p className="text-cream/60 text-sm mt-2">Check your inbox for access details.</p>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  {signupError && (
                    <div className="bg-red-900/30 text-red-300 p-3 rounded-xl text-sm border border-red-700/30">
                      {signupError}
                    </div>
                  )}
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    className="w-full bg-cream/10 border border-cream/20 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    className="w-full bg-cream/10 border border-cream/20 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full bg-gold text-navy font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center group disabled:opacity-70"
                  >
                    {signupLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        Get Free Access <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-cream/40 text-xs mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
