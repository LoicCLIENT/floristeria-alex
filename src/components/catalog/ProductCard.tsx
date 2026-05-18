import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/producto/${product.id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <Badge variant="primary" size="sm">
                Bestseller
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="error" size="sm">
                Oferta
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              className="p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg shadow-black/10 hover:bg-white/95 hover:shadow-xl transition-all duration-200 border border-white/60"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="w-4 h-4 text-olive-600" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white/95 text-olive-700 hover:text-olive-800 py-3 rounded-xl font-medium transition-all duration-200 border border-white/60 shadow-lg shadow-black/10 hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {product.price.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
