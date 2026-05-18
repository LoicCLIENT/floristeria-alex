import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

export default function CartSummary() {
  const { items, getSubtotal, getShipping, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();
  const freeShippingThreshold = 50;
  const amountForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
      <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
        Resumen del Pedido
      </h3>

      {/* Free shipping progress */}
      {shipping > 0 && (
        <div className="mb-6 p-4 bg-cream-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Truck className="w-4 h-4 text-primary-400" />
            <span>
              ¡Añade {amountForFreeShipping.toFixed(2)}€ más para envío gratis!
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-400 rounded-full transition-all"
              style={{
                width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Items count */}
      <div className="text-sm text-gray-500 mb-4">
        {items.reduce((acc, item) => acc + item.quantity, 0)} artículos
      </div>

      {/* Price breakdown */}
      <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-gray-900">
          {total.toFixed(2)}€
        </span>
      </div>

      {/* Checkout Button */}
      <Link to="/checkout">
        <Button fullWidth size="lg">
          Proceder al Checkout
        </Button>
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/catalogo"
        className="block text-center text-sm text-primary-400 hover:text-primary-500 mt-4 transition-colors"
      >
        Seguir comprando
      </Link>

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center space-y-2">
          <p>🔒 Pago seguro garantizado</p>
          <p>🚚 Envío en 24-48h</p>
          <p>💐 Flores frescas garantizadas</p>
        </div>
      </div>
    </div>
  );
}
