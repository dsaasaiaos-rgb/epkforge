import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Zap, Menu, X, Play } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (page) => location.pathname.includes(page);

  const navLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'Spotlight', page: 'Spotlight' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        h1, h2, h3, h4 { font-family: 'Poppins', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ff4444;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .btn-primary {
          background: #ff4444;
          color: white;
          transition: background 0.2s, transform 0.1s;
        }
        .btn-primary:hover { background: #ff6b35; transform: translateY(-1px); }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 68, 68, 0.15);
        }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#ff4444] rounded-lg flex items-center justify-center group-hover:bg-[#ff6b35] transition-colors">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ITS<span className="text-[#ff4444]">FAMM</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, page }) => (
                <Link
                  key={page}
                  to={createPageUrl(page)}
                  className={`nav-link text-sm font-medium transition-colors ${isActive(page) ? 'text-white active' : 'text-[#aaa] hover:text-white'}`}
                >
                  {label}
                </Link>
              ))}
              <Link to={createPageUrl('Spotlight')}>
                <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Rising Stars
                </button>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[#aaa] hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#141414] px-4 py-4 space-y-3">
            {navLinks.map(({ label, page }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                className="block text-sm font-medium text-[#aaa] hover:text-white py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 py-10 text-center text-[#555] text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#ff4444] rounded flex items-center justify-center">
            <Play className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ITS<span className="text-[#ff4444]">FAMM</span>
          </span>
        </div>
        <p>Guarantee's Quality — NC &amp; FL Independent Music</p>
      </footer>
    </div>
  );
}