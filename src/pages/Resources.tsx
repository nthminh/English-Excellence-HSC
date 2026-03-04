import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle, ArrowRight, Loader2, BookOpen, MessageSquare, Award, Users } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const detailedResources = [
  {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/the%20guide%20HSc.png?alt=media&token=5f51a698-5c62-4403-a331-58fe41477052",
    bookTitle: "The Guide to HSC English",
    mainTitle: "The Guide to HSC English",
    description: "The ultimate guide on how to understand, practice and execute any Essay writing in the HSC.",
    features: [
      { icon: "BookOpen", value: "50+", label: "Pages with breakdowns, structures, and examples." },
      { icon: "FileText", value: "", label: "" },
      { icon: "MessageSquare", value: "", label: "" },
      { icon: "Award", value: "", label: "Plan on how to prepare for exams" },
    ],
    downloadUrl: "https://tally.so/r/woaKYX",
  },
  {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/guide.png?alt=media&token=ed2fe22c-29ba-496b-84ff-48220447e738",
    bookTitle: "The Guide to Creative Writing",
    mainTitle: "The Guide to Creative Writing",
    description: "The guide to write imaginative, discursive and persuasive responses with examples and feedback.",
    features: [
      { icon: "BookOpen", value: "100+", label: "Pages" },
      { icon: "FileText", value: "9", label: "Band 6 Example Scripts" },
      { icon: "MessageSquare", value: "150+", label: "Feedback Comments" },
      { icon: "Award", value: "✓", label: "Predicted marks" },
    ],
    downloadUrl: "https://tally.so/r/VL5xjv",
  },
  {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/example%20responses.png?alt=media&token=8a05fe37-e2c0-48fd-a8b7-4de63cd4fe3d",
    bookTitle: "Common Module: Sample Responses",
    mainTitle: "Common Module",
    description: "Example responses on the \"Texts and Human Experiences Module\".",
    features: [
      { icon: "BookOpen", value: "80", label: "Pages" },
      { icon: "FileText", value: "11+", label: "Essay Scripts" },
      { icon: "MessageSquare", value: "200+", label: "Feedback Comments" },
      { icon: "Award", value: "✓", label: "Variety of HSC Texts" },
    ],
    downloadUrl: "https://tally.so/r/n0Ndg6",
  },
  {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/modeA.png?alt=media&token=5e98e391-15d6-498e-9909-eaa276ef92ab",
    bookTitle: "Mod A: Sample Responses",
    mainTitle: "Mod A Samples",
    description: "Example responses on \"Textual Conversations\" (Advanced) and \"Language, Identity and Culture\" (Standard).",
    features: [
      { icon: "BookOpen", value: "86", label: "Pages" },
      { icon: "FileText", value: "12", label: "Essay Scripts" },
      { icon: "MessageSquare", value: "200+", label: "Feedback Comments" },
      { icon: "Award", value: "✓", label: "Covers variety of HSC text" },
    ],
    downloadUrl: "https://tally.so/r/LZWoz1",
  },
  {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/booksample.png?alt=media&token=2d9eedc9-1e90-418f-ac73-5618d4b07d06",
    bookTitle: "Example Responses: MOD B",
    mainTitle: "MOD B Samples",
    description: "Everything you need to excel in HSC English — written by tutors, built for students, and 100% free.",
    features: [
      { icon: "BookOpen", value: "300+", label: "Pages of Content" },
      { icon: "FileText", value: "40+", label: "Example Responses" },
      { icon: "MessageSquare", value: "600+", label: "Feedback Comments" },
      { icon: "Award", value: "✓", label: "Mark Values Included" },
    ],
    downloadUrl: "https://tally.so/r/yP97N4",
  },
];

const iconMap: { [key: string]: React.ReactNode } = {
    BookOpen: <BookOpen size={20} />,
    FileText: <FileText size={20} />,
    MessageSquare: <MessageSquare size={20} />,
    Award: <Award size={20} />,
  };

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

        <div className="space-y-20">
          {detailedResources.map((resource, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-navy rounded-[3rem] overflow-hidden"
              >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Book Image Area */}
                  <div className="relative flex items-center justify-center p-12 bg-navy/95 min-h-[420px]" style={{ perspective: '1200px' }}>
                      <div className="absolute inset-0 bg-gold/5 rounded-l-[3rem]" />
                      <motion.div
                          className="relative z-10 w-72 h-96"
                          whileHover={{ rotateY: -18, x: -10 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          style={{ transformStyle: 'preserve-3d' }}
                      >
                          <img
                              src={resource.imageUrl}
                              alt={resource.bookTitle}
                              className="absolute w-full h-full object-cover rounded-lg shadow-2xl"
                              style={index === 0 ? { transform: 'translateY(20px)' } : {}}
                          />
                          <div
                              className="absolute left-0 top-0 h-full w-8 bg-gray-800"
                              style={{
                                  transform: 'rotateY(-90deg) translateX(-16px)',
                                  transformOrigin: 'right',
                                  backfaceVisibility: 'hidden',
                                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                              }}
                          ></div>
                          <div className="absolute -top-4 -right-4 bg-gold text-navy font-sans font-black text-sm px-4 py-2 rounded-full shadow-lg rotate-6 uppercase tracking-widest z-20">
                              FREE
                          </div>
                      </motion.div>
                  </div>

                  {/* Stats & Info Area */}
                  <div className="p-12 flex flex-col justify-center bg-navy">
                  <div className="mb-2">
                      <span className="text-gold font-sans font-black text-xs uppercase tracking-[0.35em]">Completely Free</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-3 leading-tight">
                      <span className="text-gold italic">{resource.mainTitle}</span>
                  </h2>
                  <p className="text-cream/60 font-sans text-base mb-8 leading-relaxed">
                      {resource.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      {resource.features.filter(stat => stat.label).map((stat) => (
                      <div key={stat.label} className="bg-cream/5 border border-cream/10 rounded-2xl p-4 flex items-start gap-3">
                          <span className="text-gold mt-0.5">{iconMap[stat.icon]}</span>
                          <div>
                          <p className="text-cream font-sans font-black text-xl leading-none">{stat.value}</p>
                          <p className="text-cream/50 font-sans text-xs mt-1 leading-snug">{stat.label}</p>
                          </div>
                      </div>
                      ))}
                  </div>

                  <a
                    href={resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-gold text-navy font-bold py-4 px-6 rounded-2xl hover:bg-opacity-90 transition-all group mb-8"
                  >
                    Download Resource
                    <Download className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex items-center gap-2 text-cream/60 font-sans text-sm">
                      <Users size={16} className="text-gold" />
                      <span>Written by <span className="text-gold font-semibold">tutors</span> for students</span>
                  </div>
                  </div>
              </div>
              </motion.div>
          ))}
        </div>


        {/* Sign up form for resources */}
        <div className="bg-navy rounded-[3rem] p-12 md:p-20 relative overflow-hidden mt-20">
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
