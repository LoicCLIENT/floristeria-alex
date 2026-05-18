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

      {/* WhatsApp Order CTA */}
      <a
        href={`https://wa.me/34633641074?text=${encodeURIComponent(`Hola! Me gustaría pedir: ${product.name} (${product.price.toFixed(2)}€)`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#1da851] transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Pedir por WhatsApp
      </a>

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
