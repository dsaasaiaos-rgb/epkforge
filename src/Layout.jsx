import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Home, Zap, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }) {
  const location = useLocation();
  const isSpotlight = location.pathname.includes('Spotlight');

  return (
    <div className="min-h-screen font-sans bg-black text-white">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
                  ITSFAMM
                </span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to={createPageUrl('Home')}>
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                    Home
                  </Button>
                </Link>
                <Link to={createPageUrl('Spotlight')}>
                  <Button 
                    variant={isSpotlight ? "secondary" : "ghost"} 
                    className={isSpotlight ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-gray-300 hover:text-white hover:bg-gray-800"}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Spotlight
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-gray-900 border-gray-800 text-white">
                  <div className="flex flex-col gap-4 mt-8">
                    <Link to={createPageUrl('Home')}>
                      <Button variant="ghost" className="w-full justify-start text-gray-300">
                        <Home className="w-4 h-4 mr-2" />
                        Home
                      </Button>
                    </Link>
                    <Link to={createPageUrl('Spotlight')}>
                      <Button variant="ghost" className="w-full justify-start text-gray-300">
                        <Zap className="w-4 h-4 mr-2" />
                        Rising Stars
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
}