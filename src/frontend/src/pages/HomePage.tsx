import { useGetCompanyInfo, useGetBusinessCardImage } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, ArrowRight, Sparkles, Award, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'products' | 'contact') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: companyInfo } = useGetCompanyInfo();
  const { data: businessCardImage } = useGetBusinessCardImage();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('/assets/generated/tile-pattern-bg.dim_1024x768.jpg')] opacity-5 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                  Premium Quality Since Years
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight">
                {companyInfo?.name || 'Shree Nakoda Tiles'}
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-amber-700 italic">
                "{companyInfo?.slogan || 'Sabse Sasta Sabse Accha'}"
              </p>
              <p className="text-lg text-muted-foreground">
                Discover our extensive collection of premium tiles and sanitaryware. 
                Quality products at unbeatable prices for your dream home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('products')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('contact')}
                  className="border-amber-300 text-amber-900 hover:bg-amber-50"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="/assets/generated/hero-banner.dim_1200x400.jpg"
                alt="Shree Nakoda Tiles Showroom"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Handpicked tiles and sanitaryware from trusted manufacturers ensuring durability and elegance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Best Prices</h3>
                <p className="text-muted-foreground">
                  Competitive pricing without compromising on quality. Get the best value for your investment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Quick Delivery</h3>
                <p className="text-muted-foreground">
                  Fast and reliable delivery service to ensure your project stays on schedule.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Card Section */}
      {businessCardImage && (
        <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">Visit Our Showroom</h2>
              <Card className="border-amber-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src={businessCardImage.getDirectURL()}
                        alt="Shree Nakoda Tiles Business Card"
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-amber-900 mb-1">Location</h3>
                          <p className="text-muted-foreground">
                            {companyInfo?.address || 'Devli Piplone Road, Agar-Malwa'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-amber-900 mb-1">Contact Numbers</h3>
                          <div className="space-y-1">
                            {companyInfo?.phone_numbers.map((phone, index) => (
                              <p key={index} className="text-muted-foreground">
                                <a href={`tel:${phone}`} className="hover:text-amber-700 transition-colors">
                                  {phone}
                                </a>
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 text-amber-50">
            Browse our collection and find the perfect tiles for your project
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('products')}
            className="bg-white text-amber-700 hover:bg-amber-50 shadow-lg hover:shadow-xl transition-all"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
