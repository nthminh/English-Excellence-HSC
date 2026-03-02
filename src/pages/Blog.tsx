import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { IMAGES } from '../constants/images';

const posts = [
  {
    title: 'How to Structure a Band 6 Essay',
    date: 'Oct 15, 2023',
    author: 'English Excellence',
    category: 'HSC Strategy',
    excerpt: 'The difference between a Band 5 and a Band 6 often comes down to structure. Learn the key elements every high-scoring essay needs.',
    image: IMAGES.blogPlaceholder(1)
  },
  {
    title: 'Common Module: Texts and Human Experiences',
    date: 'Nov 2, 2023',
    author: 'English Excellence',
    category: 'Text Analysis',
    excerpt: 'A deep dive into the core concepts of the Common Module and how to apply them to your prescribed texts.',
    image: IMAGES.blogPlaceholder(2)
  },
  {
    title: 'Managing HSC Stress and Burnout',
    date: 'Dec 10, 2023',
    author: 'English Excellence',
    category: 'Student Life',
    excerpt: 'Success isn\'t just about studying hard; it\'s about studying smart and taking care of your mental health.',
    image: IMAGES.blogPlaceholder(3)
  }
];

export function Blog() {
  return (
    <div className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
        <img src="https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/logogray.png?alt=media&token=a7fca0d1-c096-459f-9ccd-faf66a81a68e" alt="Gray Logo" style={{width: 80, height: 'auto'}} className="mx-auto mb-6 logo-spin" />
          <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Blog & Updates</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">Insights for <span className="text-gold italic">HSC Success</span></h1>
          <p className="text-navy/60 text-xl leading-relaxed">
            Stay updated with the latest HSC English strategies, text analyses, and announcements from English Excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-navy/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-gold text-navy text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-6 text-xs text-navy/40 font-bold uppercase tracking-widest mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-gold" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={14} className="text-gold" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-navy/60 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="flex items-center text-navy font-bold group-hover:text-gold transition-colors">
                  Read Full Article <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
