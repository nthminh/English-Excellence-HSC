import React from 'react';
import { motion } from 'motion/react';
import { Star, Upload, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function LeaveReview() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [rating, setRating] = React.useState(5);
  const [formData, setFormData] = React.useState({
    name: '',
    school: '',
    result: '',
    testimonial: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await addDoc(collection(db, 'reviews'), {
          ...formData,
          rating,
          createdAt: serverTimestamp(),
          status: 'pending',
        });
      } else {
        console.warn('Firebase not configured. Submission simulated.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Unable to submit your review. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gold/20"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-gold" size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-navy mb-4">Thank You!</h2>
          <p className="text-navy/60 mb-8">
            Your testimonial has been submitted successfully. We appreciate your feedback and are proud of your success!
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', school: '', result: '', testimonial: '' });
              setRating(5);
            }}
            className="text-gold font-bold hover:underline"
          >
            Submit another review
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <img src="https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/logogray.png?alt=media&token=a7fca0d1-c096-459f-9ccd-faf66a81a68e" alt="Gray Logo" style={{width: 80, height: 'auto'}} className="mx-auto mb-6 logo-spin" />
          <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Share Your Story</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">Leave a <span className="text-gold italic">Testimonial</span></h1>
          <p className="text-navy/60 text-xl leading-relaxed">
            Your feedback helps us improve and inspires other students to reach their goals.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gold/20"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-900/30 text-red-300 p-4 rounded-2xl text-sm border border-red-700/30">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">Your Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full bg-cream/5 border border-cream/10 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">Your School</label>
                <input
                  required
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full bg-cream/5 border border-cream/10 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="e.g. Sydney Grammar"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">HSC Result (Optional)</label>
                <input
                  name="result"
                  value={formData.result}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full bg-cream/5 border border-cream/10 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="e.g. Band 6 (95)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">Rating</label>
                <div className="flex items-center space-x-2 h-[60px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      className="text-gold transition-transform hover:scale-110"
                    >
                      <Star size={32} fill={i <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">Your Testimonial</label>
              <textarea
                required
                name="testimonial"
                value={formData.testimonial}
                onChange={handleInputChange}
                className="w-full bg-cream/5 border border-cream/10 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-gold/50 transition-colors min-h-[160px]"
                placeholder="Share your experience with English Excellence..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-cream/60 text-xs font-bold uppercase tracking-widest ml-1">Upload a Photo (Optional)</label>
              <div className="border-2 border-dashed border-cream/10 rounded-3xl p-8 text-center hover:border-gold/30 transition-colors cursor-pointer group">
                <Upload className="text-gold/40 group-hover:text-gold mx-auto mb-4 transition-colors" size={32} />
                <p className="text-cream/40 text-sm">Drag and drop your photo here, or click to browse</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-navy font-bold py-5 rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center group text-lg disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    Submit Testimonial
                    <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                  </>
                )}
              </button>

              <a
                href="https://www.google.com/search?num=10&sca_esv=64c17adec9ee4761&sxsrf=ANbL-n4fnR0Jn0G4M_eNFvq-BlXvyRMk7g:1772427409334&kgmid=/g/11x6gk3n_y&query=English+Excellence&shem=dlvs1,epsd1,rimspe,rimspiose,shrtsdl&shndl=30&source=sh/x/loc/uni/m1/1&kgs=7dad79e7afb87875&utm_source=dlvs1,epsd1,rimspe,rimspiose,shrtsdl,sh/x/loc/uni/m1/1#lrd=0x809aaf294c1db837:0x618b67fadfbd83ef,1,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-transparent border-2 border-gold text-gold font-bold py-5 rounded-2xl hover:bg-gold hover:text-navy transition-colors duration-300 group text-lg"
              >
                Write a review on Google
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
