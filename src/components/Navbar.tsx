import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Inquiry', path: '/inquiry' },
  { name: 'Resources', path: '/resources' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4">
              <Logo size={64} />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold leading-tight tracking-tight">ENGLISH</span>
                <span className="text-xs font-sans font-medium tracking-[0.3em] text-gold uppercase">EXCELLENCE</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  location.pathname === item.path ? "text-gold border-b-2 border-gold" : "text-black/80"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/inquiry"
              className="bg-gold text-navy px-6 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Book Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gold transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-black/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path ? "text-gold bg-black/5" : "text-black/80 hover:text-gold hover:bg-black/5"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/inquiry"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-gold"
            >
              Book Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
