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
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 bg-white rounded-full shadow-soft hover:bg-cream-100 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary-400 hover:bg-primary-500 text-white py-3 rounded-xl font-medium transition-colors"
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
