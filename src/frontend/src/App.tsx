import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetIsCallerAdmin } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import { useState } from 'react';

export default function App() {
  const { isInitializing } = useInternetIdentity();
  const { data: isAdmin } = useGetIsCallerAdmin();
  
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'admin' | 'contact'>('home');

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-amber-50/30 to-white">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} isAdmin={isAdmin} />
        
        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'products' && <ProductsPage />}
          {currentPage === 'admin' && <AdminPage />}
          {currentPage === 'contact' && <ContactPage />}
        </main>

        <Footer />
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
