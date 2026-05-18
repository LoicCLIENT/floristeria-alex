import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-soft">
      {/* Image */}
      <Link to={`/producto/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-xl"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              to={`/producto/${product.id}`}
              className="font-medium text-gray-900 hover:text-primary-400 transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
              {product.description}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-olive-400 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-olive-50/50 backdrop-blur-sm border border-olive-200/40 rounded-xl overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-2 hover:bg-olive-100/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-olive-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium text-olive-800">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="p-2 hover:bg-olive-100/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-olive-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {(product.price * quantity).toFixed(2)}€
            </p>
            {quantity > 1 && (
              <p className="text-sm text-gray-500">
                {product.price.toFixed(2)}€ / unidad
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
