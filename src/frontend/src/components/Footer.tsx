import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-amber-200/50 bg-gradient-to-br from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-3">Shree Nakoda Tiles</h3>
            <p className="text-sm text-amber-700 mb-2 font-medium">Sabse Sasta Sabse Accha</p>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for premium tiles and sanitaryware solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-amber-700 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-700 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-700 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-700 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-700 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-700 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-200/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            © 2025. Built with{' '}
            <Heart className="w-4 h-4 text-amber-600 fill-amber-600 inline" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
