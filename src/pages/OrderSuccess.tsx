import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderSuccess() {
  const orderNumber = `FL-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8 animate-fade-in">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="heading-1 text-gray-900 mb-4 animate-slide-up">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Gracias por tu compra. Hemos recibido tu pedido y lo estamos
            preparando con mucho cuidado.
          </p>

          {/* Order Number */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <p className="text-sm text-gray-500 mb-1">Número de pedido</p>
            <p className="text-2xl font-serif font-semibold text-gray-900">
              {orderNumber}
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 text-left">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
              ¿Qué pasa ahora?
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: Package,
                  title: 'Preparación',
                  description:
                    'Nuestro equipo preparará tu ramo con las flores más frescas.',
                },
                {
                  icon: Truck,
                  title: 'Envío',
                  description:
                    'Te enviaremos un email con el seguimiento de tu pedido.',
                },
                {
                  icon: Calendar,
                  title: 'Entrega',
                  description:
                    'Recibirás tu pedido en la fecha y horario seleccionados.',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="secondary" size="lg">
                Volver al Inicio
              </Button>
            </Link>
            <Link to="/catalogo">
              <Button size="lg">Seguir Comprando</Button>
            </Link>
          </div>

          {/* Contact */}
          <p className="mt-8 text-sm text-gray-500">
            ¿Tienes alguna pregunta?{' '}
            <Link
              to="/contacto"
              className="text-primary-400 hover:text-primary-500 font-medium"
            >
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
