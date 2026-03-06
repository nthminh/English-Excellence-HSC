import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight, UserCheck, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const staticReviews: Review[] = [
  {
    id: 'static-jasmine-hakky',
    name: 'Jasmine Hakky',
    school: 'Previous Student',
    result: 'Band 6',
    quote: 'Guys if your looking for a tutor that will actually teach you how to write a essay or anything not just some useless activities this is your guy I graduated this year and he\'s been tutoring me since the end of my year 10 class and I went from failing to slowly building up my marks and actually enjoying English and knowing how to write I can go on and on about how good he is but you should try for yourself you wouldn\'t regret it he\'s not just a tutor but honestly a great person for life advises and truely makes sure you put your all in your work',
    rating: 5,
  },
  {
    id: 'static-f-parent',
    name: 'F',
    school: 'Parent',
    result: 'Improved Grades',
    quote: 'Super happy the result of my son\'s grades after being tutored by Leo in just a year. Would recommend him as he not only keeps my kid accountable but also keeps me as the parent with clear communication and care. Thank you!',
    rating: 5,
  },
  {
    id: 'static-nina-hermez',
    name: 'Nina Hermez',
    school: 'Previous Student',
    result: 'Band 6',
    quote: 'Leo is an excellent English tutor who provides amazing constructive and detailed feedback! Leo has helped me push my essay from a band 5 to a band 6 with the feedback he provided. I wish you all the best!',
    rating: 5,
  },
  {
    id: 'static-matthew-marshall',
    name: 'Matthew Marshall',
    school: 'Previous Student',
    result: 'Improved Marks',
    quote: 'The resources I\'ve received from here are just phenomenal. They are really well set out and easy to follow and understand, making it perfect for learning how to improve your own. I would and will represent English Excellence to any student looking to improve their marks or ensure that they maximise their marks. Leo is very helpful and amazing to work with. He helped me out a lot and I am very grateful for his assistance.',
    rating: 5,
  }
];

type Review = {
  id: string;
  name: string;
  school: string;
  result: string;
  quote: string;
  rating: number;
};

export function Reviews() {
  const [dynamicReviews, setDynamicReviews] = React.useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = React.useState(true);

  React.useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      setLoadingReviews(false);
      return;
    }
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved'),
          orderBy('actionedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetched: Review[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name ?? 'Anonymous',
            school: d.school ?? '',
            result: d.result ?? '',
            quote: d.testimonial ?? '',
            rating: typeof d.rating === 'number' ? d.rating : 5,
          };
        });
        setDynamicReviews(fetched);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const allReviews = [...dynamicReviews, ...staticReviews];

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

        {loadingReviews ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin text-gold" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {allReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-sm hover:shadow-xl transition-all relative group"
              >
                <Quote className="absolute top-10 right-10 text-gold/10 group-hover:text-gold/20 transition-colors" size={80} />
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/20 overflow-hidden flex items-center justify-center bg-gold/10">
                    <User className="text-gold" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-navy">{review.name}</h3>
                    <p className="text-xs text-navy/40 font-bold uppercase tracking-widest">{review.school}</p>
                  </div>
                </div>
                <div className="flex text-gold mb-6">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <Star key={starNum} size={16} fill={starNum <= review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-navy/70 text-lg italic leading-relaxed mb-8 relative z-10">
                  "{review.quote}"
                </p>
                {review.result && (
                  <div className="inline-flex items-center space-x-2 bg-navy text-gold px-4 py-2 rounded-full text-sm font-bold">
                    <UserCheck size={16} />
                    <span>Result: {review.result}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action for Reviews */}
        <div className="bg-gold rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Logo size={200} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-8 relative z-10">Are you a past student?</h2>
          <p className="text-navy/70 text-xl font-medium mb-12 max-w-2xl mx-auto">
            We would love to hear about your success! Share your story and help inspire the next generation of HSC students.
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
