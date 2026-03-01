import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-navy text-cream pt-16 pb-8 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-4 mb-8">
              <Logo size={48} />
              <div className="flex flex-col">
                <span className="text-md font-serif font-bold leading-tight">ENGLISH</span>
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-gold uppercase">EXCELLENCE</span>
              </div>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              Premium 1-on-1 HSC English tutoring that guarantees improvement. We focus on personalized strategies to help students excel in their final years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-serif font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/inquiry" className="hover:text-gold transition-colors">Book Trial</Link></li>
              <li><Link to="/resources" className="hover:text-gold transition-colors">Free Resources</Link></li>
              <li><Link to="/reviews" className="hover:text-gold transition-colors">Student Success</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Blog & Updates</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gold font-serif font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">FAQs</Link></li>
              <li><Link to="/reviews" className="hover:text-gold transition-colors">Leave a Review</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-serif font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-cream/70">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span>Leo@eehsc.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>0431 878 221</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>Sydney, NSW, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 text-center text-cream/40 text-xs">
          <p>&copy; {new Date().getFullYear()} English Excellence Tutoring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
