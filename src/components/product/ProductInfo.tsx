import { useState } from 'react';
import { ShoppingBag, Heart, Minus, Plus, Truck, Leaf, Shield } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { categories } from '../../data/products';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const categoryInfo = categories.find((c) => c.id === product.category);

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.bestseller && <Badge variant="primary">Bestseller</Badge>}
        {product.originalPrice && <Badge variant="error">Oferta</Badge>}
        {product.stock < 5 && product.stock > 0 && (
          <Badge variant="warning">Últimas unidades</Badge>
        )}
      </div>

      {/* Category */}
      {categoryInfo && (
        <p className="text-sm text-primary-400 font-medium">{categoryInfo.name}</p>
      )}

      {/* Title */}
      <h1 className="heading-2">{product.name}</h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-gray-900">
          {product.price.toFixed(2)}€
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through">
            {product.originalPrice.toFixed(2)}€
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-body">{product.description}</p>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-olive-700">Cantidad</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/60 backdrop-blur-sm border border-olive-200/40 rounded-xl overflow-hidden">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-3 hover:bg-olive-50/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-olive-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium text-olive-800">{quantity}</span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="p-3 hover:bg-olive-50/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-olive-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-olive-500">
            {product.stock} disponibles
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button onClick={handleAddToCart} size="lg" className="flex-1">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Añadir al carrito
        </Button>
        <button className="p-4 bg-white/60 backdrop-blur-md border border-olive-200/40 rounded-xl hover:bg-white/90 hover:border-olive-300/60 transition-all duration-200 shadow-sm hover:shadow-md">
          <Heart className="w-6 h-6 text-olive-600" />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        {[
          {
            icon: Truck,
            title: 'Envío 24-48h',
            description: 'Gratis +50€',
          },
          {
            icon: Leaf,
            title: 'Flores Frescas',
            description: 'Del productor',
          },
          {
            icon: Shield,
            title: 'Garantía',
            description: '100% satisfacción',
          },
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <feature.icon className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{feature.title}</p>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Care Instructions */}
      {product.careInstructions && (
        <div className="p-4 bg-cream-50 rounded-xl">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Instrucciones de cuidado
          </h4>
          <p className="text-sm text-gray-600">{product.careInstructions}</p>
        </div>
      )}
    </div>
  );
}
