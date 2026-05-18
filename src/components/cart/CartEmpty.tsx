import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';

export default function CartEmpty() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-cream-100 rounded-full mb-6">
        <ShoppingBag className="w-10 h-10 text-primary-400" />
      </div>
      <h2 className="heading-3 mb-4">Tu carrito está vacío</h2>
      <p className="text-body max-w-md mx-auto mb-8">
        ¿No sabes qué comprar? ¡Explora nuestra colección de flores y plantas
        para encontrar el regalo perfecto!
      </p>
      <Link to="/catalogo">
        <Button size="lg">Explorar Catálogo</Button>
      </Link>
    </div>
  );
}
