'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface AppHeaderProps {
  className?: string;
}

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-100 bg-card border-b border-border ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">DC</span>
                </div>
                <span className="text-xl font-semibold text-foreground hidden sm:block">
                  Damage Control
                </span>
              </Link>
            </div>
            <div className="w-10 h-10" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-100 bg-card border-b border-border transition-smooth ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
              aria-label="Damage Control Calculator Home"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-bold text-lg">DC</span>
              </div>
              <span className="text-xl font-semibold text-foreground hidden sm:block">
                Damage Control
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-4" aria-label="Main navigation">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;