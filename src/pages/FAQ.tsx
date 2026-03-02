import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the "guaranteed improvement" work?',
    answer: 'We are so confident in our methods that if you don\'t see a measurable improvement in your school assessment marks or internal rankings within the first term of tutoring, we will refund your fees. We track progress through regular mock assessments and feedback loops.'
  },
  {
    question: 'Where do the tutoring sessions take place?',
    answer: 'We offer both in-person sessions at our Sydney CBD office and high-quality online sessions via Zoom. Our online platform includes interactive whiteboards and real-time document collaboration.'
  },
  {
    question: 'What English subjects do you cover?',
    answer: 'We specialize in HSC English Advanced, English Standard, and English Extension 1 & 2. We also provide support for Year 11 students preparing for their final year.'
  },
  {
    question: 'How often are the sessions?',
    answer: 'Most students find that one 90-minute session per week is ideal. However, we can increase frequency during peak assessment periods or leading up to the Trial and HSC exams.'
  },
  {
    question: 'Do you provide feedback on drafts outside of sessions?',
    answer: 'Yes! All our premium students get unlimited draft feedback. You can submit your essays or creative pieces anytime, and we will provide detailed annotations within 24-48 hours.'
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  return (
    <div className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
        <img src="https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/logogray.png?alt=media&token=a7fca0d1-c096-459f-9ccd-faf66a81a68e" alt="Gray Logo" style={{width: 80, height: 'auto'}} className="mx-auto mb-6 logo-spin" />
          <h2 className="text-gold font-sans font-bold text-sm uppercase tracking-[0.3em] mb-4">Support</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">Frequently Asked <span className="text-gold italic">Questions</span></h1>
          <p className="text-navy/60 text-xl leading-relaxed">
            Everything you need to know about our tutoring process, policies, and how we help you succeed.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-navy/5 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="text-xl font-serif font-bold text-navy group-hover:text-gold transition-colors">
                  {faq.question}
                </span>
                <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-navy transition-all">
                  {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-navy/60 leading-relaxed border-t border-navy/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-navy p-12 rounded-[3rem] text-center border border-gold/20">
          <HelpCircle className="text-gold mx-auto mb-6" size={48} />
          <h3 className="text-2xl font-serif font-bold text-cream mb-4">Still have questions?</h3>
          <p className="text-cream/60 mb-8">
            We're here to help. Reach out to us directly and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:contact@englishexcellence.com.au"
            className="bg-gold text-navy px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
