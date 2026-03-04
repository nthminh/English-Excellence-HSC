import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { IMAGES } from '../constants/images';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const ADMIN_EMAIL = 'leo@eehsc.com';

const INQUIRY_CONFIRMATION_MESSAGE = `Hi there,

Thank you for reaching out to English Excellence.

We've received your enquiry regarding a trial class. A member of our team will be in touch shortly using the phone number you provided to organise a suitable time and discuss the next steps.

During this call, we'll also take a moment to understand the student's current level, upcoming assessments, and goals to ensure the trial lesson is as useful and personalised as possible. If there are any concerns between now and then, don't be afraid to contact us. (0431878221)

We look forward to speaking with you soon.

Kind regards,
English Excellence`;

const SchoolLogos = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto overflow-hidden shadow-2xl rounded-2xl">
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/94.png?alt=media&token=b9e3c01b-00ee-46a9-a5c2-bc3b6eee2852" 
        alt="Featured Schools" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export function Inquiry() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    parentFirstName: '',
    parentLastName: '',
    childFirstName: '',
    childLastName: '',
    phone: '',
    email: '',
    yearLevel: '',
    englishLevel: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'englishLevel') {
      setFormData(prev => ({
        ...prev,
        englishLevel: checked 
          ? [...prev.englishLevel, value]
          : prev.englishLevel.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const sendEmails = async (data: typeof formData) => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_INQUIRY_ADMIN_TEMPLATE_ID;
    const userTemplateId = import.meta.env.VITE_EMAILJS_INQUIRY_USER_TEMPLATE_ID;

    if (!publicKey || !serviceId) return;

    const englishLevels = data.englishLevel.join(', ') || 'Not specified';

    // Notify admin
    if (adminTemplateId) {
      await emailjs.send(serviceId, adminTemplateId, {
        to_email: ADMIN_EMAIL,
        parent_name: `${data.parentFirstName} ${data.parentLastName}`.trim(),
        child_name: `${data.childFirstName} ${data.childLastName}`.trim(),
        phone: data.phone,
        email: data.email,
        year_level: data.yearLevel,
        english_level: englishLevels,
      }, publicKey);
    }

    // Send confirmation to user
    if (userTemplateId && data.email) {
      await emailjs.send(serviceId, userTemplateId, {
        to_email: data.email,
        parent_name: data.parentFirstName,
        message: INQUIRY_CONFIRMATION_MESSAGE,
      }, publicKey);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await addDoc(collection(db, 'inquiries'), {
          ...formData,
          createdAt: serverTimestamp(),
          status: 'new'
        });
      } else {
        console.warn('Firebase not configured. Submission simulated.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      try {
        await sendEmails(formData);
      } catch (emailErr) {
        console.warn('Email notification failed:', emailErr);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#e8e4d9]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-[#02074d]/10"
        >
          <div className="w-20 h-20 bg-[#02074d]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-[#02074d]" size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#02074d] mb-4">Trial Booked!</h2>
          <p className="text-[#02074d]/60 mb-8">
            We've received your request. One of our experts will contact you shortly to finalize your trial class.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                parentFirstName: '',
                parentLastName: '',
                childFirstName: '',
                childLastName: '',
                phone: '',
                email: '',
                yearLevel: '',
                englishLevel: [],
              });
            }}
            className="text-[#02074d] font-bold hover:underline"
          >
            Book another trial
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-[#e8e4d9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-7xl font-sans font-bold text-black tracking-tight">
              Book a Trial
            </h1>
            
            <div className="space-y-6 text-black/80 text-lg max-w-lg">
              <p>
                Within an <span className="italic font-bold">hour</span> - We'll provide more value and guidance than you child has ever experienced.
              </p>
              <p>
                Whether its an upcoming exam or needed feedback on an essay, we'd be happy to reserve an hour trial class on us to ensure you approach HSC english the right way.
              </p>
            </div>

            <div className="pt-8">
              <SchoolLogos />
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              {/* Parent Name */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-black/80">Parent Name</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-black/60">First Name <span className="italic">(required)</span></span>
                    <input 
                      required 
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-black/60">Last Name</span>
                    <input 
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Child Name */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-black/80">Child Name</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-black/60">First Name <span className="italic">(required)</span></span>
                    <input 
                      required 
                      name="childFirstName"
                      value={formData.childFirstName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-black/60">Last Name <span className="italic">(required)</span></span>
                    <input 
                      required 
                      name="childLastName"
                      value={formData.childLastName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-black/80">Phone <span className="text-sm text-black/60 italic">(required)</span></label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-black/80">Email <span className="text-sm text-black/60 italic">(required)</span></label>
                <input 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                />
              </div>

              {/* Year Level Required Input */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-black/80">Year Level <span className="text-sm text-black/60 italic">(required)</span></label>
                <input 
                  required 
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleInputChange}
                  placeholder="e.g. Year 11"
                  type="text" 
                  className="w-full bg-white/40 border border-black/10 rounded-3xl px-6 py-4 focus:outline-none focus:border-black/30 transition-colors" 
                />
              </div>

              {/* English HSC Checkboxes */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-black/80">English HSC Course <span className="text-sm text-black/60 italic">(select all that apply)</span></label>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {['Standard', 'Advanced', 'Extension 1', 'Extension 2'].map((subject) => (
                    <label key={subject} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="w-6 h-6 border-2 border-black/20 rounded bg-white/40 flex items-center justify-center group-hover:border-black/40 transition-colors">
                        <input 
                          type="checkbox" 
                          name="englishLevel"
                          value={subject}
                          checked={formData.englishLevel.includes(subject)}
                          onChange={handleInputChange}
                          className="hidden peer" 
                        />
                        <div className="w-3 h-3 bg-black rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-black/80">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#02074d] text-white font-bold py-4 px-12 rounded-lg hover:bg-opacity-90 transition-all text-sm tracking-widest uppercase flex items-center justify-center min-w-[160px] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      SUBMITTING...
                    </>
                  ) : 'SUBMIT'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
