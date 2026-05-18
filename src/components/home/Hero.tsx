import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Clock } from 'lucide-react';
import gsap from 'gsap';
import Stack from '../ui/Stack';

const productImages = [
  { src: '/images/products/ramo-5.png', name: '12 Rosas Rojas', price: '45€' },
  { src: '/images/products/ramo-6.png', name: 'Rosas Amarillas', price: '35€' },
  { src: '/images/products/ramo-9.png', name: 'Rosa Spray', price: '36€' },
  { src: '/images/products/centro-2.png', name: 'Rosa Eterna', price: '54€' },
  { src: '/images/products/ramo-3.png', name: 'Ramo Elegante', price: '30€' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from(stackRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const cards = productImages.map((product, index) => (
    <div
      key={index}
      className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/50"
    >
      <div className="relative w-full h-full">
        <img
          src={product.src}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-white/70 text-sm font-medium mb-1">Floristería Alex</p>
          <p className="text-white font-serif text-2xl mb-2">{product.name}</p>
          <p className="text-white/90 text-lg font-semibold">{product.price}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#FAFAF8] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-olive-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary-100/30 to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container-custom relative z-10">
        <div className="min-h-screen grid lg:grid-cols-2 items-center gap-8 lg:gap-4 py-24 lg:py-0">

          {/* Content - Left side */}
          <div ref={contentRef} className="order-2 lg:order-1 text-center lg:text-left lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive-800/5 backdrop-blur-sm rounded-full text-olive-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-olive-500 rounded-full animate-pulse" />
              Envío gratuito a partir de 50€
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-olive-900 leading-[1.05] mb-6">
              Floristería
              <span className="block text-olive-500">Alex</span>
            </h1>

            <p className="text-lg lg:text-xl text-olive-600/80 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Flores frescas con entrega a domicilio en el Baix Penedès.
              Cada ramo es una obra de arte creada con amor.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
              <Link
                to="/catalogo"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-olive-800 text-white rounded-full font-medium hover:bg-olive-900 transition-all duration-300 shadow-xl shadow-olive-800/20 hover:shadow-2xl hover:shadow-olive-800/30 hover:scale-[1.02]"
              >
                Explorar Catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contacto"
                className="px-8 py-4 text-olive-700 font-medium hover:text-olive-900 transition-colors"
              >
                Contactar →
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-olive-200/50">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-olive-600" />
                </div>
                <p className="text-sm font-medium text-olive-800">Envío 24h</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-olive-600" />
                </div>
                <p className="text-sm font-medium text-olive-800">Flores Frescas</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-olive-600" />
                </div>
                <p className="text-sm font-medium text-olive-800">Garantía 7 días</p>
              </div>
            </div>
          </div>

          {/* Stack - Right side */}
          <div ref={stackRef} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-20 bg-gradient-to-br from-olive-200/40 via-primary-200/30 to-cream-200/40 blur-3xl rounded-full" />

              <div className="relative">
                <Stack
                  cards={cards}
                  randomRotation={true}
                  sensitivity={150}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={3500}
                  pauseOnHover={true}
                  cardWidth={380}
                  cardHeight={500}
                  animationConfig={{ stiffness: 180, damping: 22 }}
                />

                {/* Hint */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="flex -space-x-1">
                    <span className="w-2 h-2 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-olive-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-olive-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-sm text-olive-400">
                    Toca para explorar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
