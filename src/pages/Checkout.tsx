import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, Calendar, Shield } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Input, Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: '',
    paymentMethod: 'card',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and redirect to success page
    clearCart();
    navigate('/pedido-confirmado');
  };

  if (items.length === 0) {
    navigate('/carrito');
    return null;
  }

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // Generate date options for next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    };
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-400 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to="/carrito"
              className="text-gray-500 hover:text-primary-400 transition-colors"
            >
              Carrito
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                  <Input
                    label="Teléfono"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+34 600 000 000"
                    className="md:col-span-2"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="w-5 h-5 text-primary-400" />
                  <h3 className="font-serif text-xl font-semibold text-gray-900">
                    Dirección de Entrega
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Calle, número, piso"
                    className="md:col-span-2"
                  />
                  <Input
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Madrid"
                  />
                  <Input
                    label="Código Postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    placeholder="28001"
                  />
                </div>
              </div>

              {/* Delivery Date */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <h3 className="font-serif text-xl font-semibold text-gray-900">
                    Fecha de Entrega
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Fecha <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Selecciona una fecha</option>
                      {dateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Horario preferido
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Cualquier horario</option>
                      <option value="morning">Mañana (9:00 - 13:00)</option>
                      <option value="afternoon">Tarde (15:00 - 20:00)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Textarea
                    label="Notas adicionales"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales de entrega, mensaje para la tarjeta..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-primary-400" />
                  <h3 className="font-serif text-xl font-semibold text-gray-900">
                    Método de Pago
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'card', label: 'Tarjeta de crédito/débito', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { id: 'transfer', label: 'Transferencia bancaria', icon: '🏦' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium text-gray-900">{method.label}</span>
                      {formData.paymentMethod === method.id && (
                        <span className="ml-auto w-5 h-5 bg-primary-400 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </label>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Tus datos de pago están protegidos con encriptación SSL
                </p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                  Resumen del Pedido
                </h3>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {total.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                  Confirmar Pedido
                </Button>

                <p className="mt-4 text-xs text-center text-gray-500">
                  Al confirmar, aceptas nuestros términos y condiciones
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
