import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-body max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary-300 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(testimonial.date).toLocaleDateString('es-ES', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
