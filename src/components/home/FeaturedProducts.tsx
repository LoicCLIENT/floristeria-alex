import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../catalog/ProductCard';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="heading-2 mb-4">Productos Destacados</h2>
            <p className="text-body max-w-xl">
              Nuestra selección de los arreglos más populares y flores de temporada.
            </p>
          </div>
          <Link to="/catalogo">
            <Button variant="outline" className="group">
              Ver Todo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
