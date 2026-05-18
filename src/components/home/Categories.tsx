import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Explora Nuestras Categorías</h2>
          <p className="text-body max-w-2xl mx-auto">
            Encuentra el regalo perfecto entre nuestra amplia selección de flores
            y plantas cuidadosamente seleccionadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to={`/catalogo/${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4">{category.description}</p>
                <span className="inline-flex items-center text-white font-medium text-sm group-hover:text-primary-300 transition-colors">
                  Ver productos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Smaller categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {categories.slice(3).map((category) => (
            <Link
              key={category.id}
              to={`/catalogo/${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/2]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
