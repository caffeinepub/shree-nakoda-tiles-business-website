import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: 'home' | 'products' | 'admin' | 'contact';
  onNavigate: (page: 'home' | 'products' | 'admin' | 'contact') => void;
  isAdmin?: boolean;
}

export default function Header({ currentPage, onNavigate, isAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: 'home' | 'products' | 'admin' | 'contact'; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin' });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">SN</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Shree Nakoda Tiles
              </h1>
              <p className="text-xs text-amber-600 font-medium">Sabse Sasta Sabse Accha</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.id)}
                className={
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
                    : 'text-amber-900 hover:text-amber-700 hover:bg-amber-50'
                }
              >
                {item.id === 'admin' && <Shield className="w-4 h-4 mr-2" />}
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-amber-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-amber-200/50">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white justify-start'
                      : 'text-amber-900 hover:text-amber-700 hover:bg-amber-50 justify-start'
                  }
                >
                  {item.id === 'admin' && <Shield className="w-4 h-4 mr-2" />}
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
