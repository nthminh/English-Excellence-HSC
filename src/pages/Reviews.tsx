import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { IMAGES } from '../constants/images';

const reviews = [
  {
    name: 'Sarah M.',
    school: 'North Sydney Girls',
    result: 'Band 6 (96)',
    quote: 'The feedback was incredibly detailed. I went from a low Band 5 to a high Band 6 in just two terms. The essay structures provided are a game-changer.',
    image: IMAGES.reviewPlaceholder('sarah')
  },
  {
    name: 'James L.',
    school: 'Sydney Grammar',
    result: 'Band 6 (94)',
    quote: 'My tutor really understood the texts on a deep level. They helped me develop a unique voice that examiners love. Highly recommend!',
    image: IMAGES.reviewPlaceholder('james')
  },
  {
    name: 'Emily T.',
    school: 'Baulkham Hills High',
    result: 'Band 6 (95)',
    quote: 'The marked responses with examiner feedback showed me exactly what I was missing. It made the HSC English curriculum feel manageable.',
    image: IMAGES.reviewPlaceholder('emily')
  },
  {
    name: 'David K.',
    school: 'Knox Grammar',
    result: 'Band 6 (93)',
    quote: 'I used to struggle with analysis, but the personalized sessions helped me break down complex ideas into clear, sophisticated arguments.',
    image: IMAGES.reviewPlaceholder('david')
  }
];

export function Reviews() {
  return (
    <div className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Student Success</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">Real Stories, <span className="text-gold italic">Real Results</span></h1>
          <p className="text-navy/60 text-xl leading-relaxed">
            Our students consistently achieve Band 6 results and reach their full potential. Here's what they have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-sm hover:shadow-xl transition-all relative group"
            >
              <Quote className="absolute top-10 right-10 text-gold/10 group-hover:text-gold/20 transition-colors" size={80} />
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-gold/20 overflow-hidden">
                  <img src={review.image} alt={review.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy">{review.name}</h3>
                  <p className="text-xs text-navy/40 font-bold uppercase tracking-widest">{review.school}</p>
                </div>
              </div>
              <div className="flex text-gold mb-6">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-navy/70 text-lg italic leading-relaxed mb-8 relative z-10">
                "{review.quote}"
              </p>
              <div className="inline-flex items-center space-x-2 bg-navy text-gold px-4 py-2 rounded-full text-sm font-bold">
                <UserCheck size={16} />
                <span>Result: {review.result}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action for Reviews */}
        <div className="bg-gold rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Logo size={200} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-8 relative z-10">Are you a past student?</h2>
          <p className="text-navy/70 text-xl font-medium mb-12 max-w-2xl mx-auto">
            We'd love to hear about your success! Share your story and help inspire the next generation of HSC students.
          </p>
          <Link
            to="/leave-review"
            className="bg-navy text-cream px-10 py-5 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-2xl inline-flex items-center group"
          >
            Leave a Testimonial
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
