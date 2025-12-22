import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const isPrintPage = currentPageName === 'PrintExport';
  const isTikTokPage = ['Home', 'Explore'].includes(currentPageName);

  if (isPrintPage) {
    return <>{children}</>;
  }

  if (isTikTokPage) {
    return (
      <div className="relative">
        {/* Minimal TikTok-style header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">EPKForge</span>
          </div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem 
                  onClick={() => navigate(createPageUrl('Dashboard'))}
                  className="text-zinc-300 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <style>{`
        :root {
          --background: 0 0% 5%;
          --foreground: 0 0% 98%;
          --card: 0 0% 8%;
          --card-foreground: 0 0% 98%;
          --primary: 142 76% 36%;
          --primary-foreground: 0 0% 98%;
          --secondary: 0 0% 14%;
          --secondary-foreground: 0 0% 98%;
          --muted: 0 0% 14%;
          --muted-foreground: 0 0% 64%;
          --accent: 142 76% 36%;
          --accent-foreground: 0 0% 98%;
          --border: 0 0% 18%;
          --input: 0 0% 14%;
          --ring: 142 76% 36%;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">EPKForge</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to={createPageUrl('Search')} 
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                Search Artists
              </Link>
              <Link 
                to={createPageUrl('Explore')} 
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                Explore
              </Link>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link to={createPageUrl('Dashboard')}>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="text-zinc-400">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-400 cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to={createPageUrl('Login')}>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      Log In
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Build')}>
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium">
                      Build My EPK
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to={createPageUrl('Search')} 
                className="block text-zinc-400 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Artists
              </Link>
              <Link 
                to={createPageUrl('Explore')} 
                className="block text-zinc-400 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              {user ? (
                <>
                  <Link 
                    to={createPageUrl('Dashboard')} 
                    className="block text-zinc-400 hover:text-white py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="block text-red-400 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to={createPageUrl('Login')} 
                    className="block text-zinc-400 hover:text-white py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to={createPageUrl('Build')}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium">
                      Build My EPK
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-md flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">EPKForge</span>
              </div>
              <div className="flex gap-6 text-sm text-zinc-500">
                <Link to={createPageUrl('Home')} className="hover:text-white transition-colors">
                  Home
                </Link>
                <Link to={createPageUrl('Search')} className="hover:text-white transition-colors">
                  Search
                </Link>
                <Link to={createPageUrl('Explore')} className="hover:text-white transition-colors">
                  Explore
                </Link>
              </div>
              <p className="text-sm text-zinc-600">
                © {new Date().getFullYear()} EPKForge. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}