import { useGetAllProducts } from '../hooks/useQueries';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Ruler, Palette, Layers } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function ProductsPage() {
  const { data: products, isLoading } = useGetAllProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Our Products</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Explore our premium collection of tiles and sanitaryware
        </p>
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md border-amber-200 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      {/* Products Grid */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id.toString()}
              className="overflow-hidden hover:shadow-xl transition-shadow border-amber-200 group"
            >
              <div className="relative h-64 overflow-hidden bg-amber-50">
                <img
                  src={product.image.getDirectURL()}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    ₹{product.price.toString()}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-amber-900">{product.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Ruler className="w-4 h-4 mr-2 text-amber-600" />
                    <span className="font-medium">Size:</span>
                    <span className="ml-2">{product.specifications.size}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Palette className="w-4 h-4 mr-2 text-amber-600" />
                    <span className="font-medium">Color:</span>
                    <span className="ml-2">{product.specifications.color}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Layers className="w-4 h-4 mr-2 text-amber-600" />
                    <span className="font-medium">Material:</span>
                    <span className="ml-2">{product.specifications.material}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <div className="w-full text-center py-2 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-700">₹{product.price.toString()}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-amber-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-900 mb-2">
            {searchQuery ? 'No products found' : 'No products available'}
          </h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Products will appear here once added by the admin'}
          </p>
        </div>
      )}
    </div>
  );
}
