import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-cream-50 overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-16 py-24 lg:py-0">

          <div ref={contentRef} className="flex-1 max-w-lg text-center lg:text-left">
            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-semibold text-olive-900 leading-[1.1] mb-6">
              Floristería Alex
            </h1>

            <p className="text-lg text-olive-600 leading-relaxed mb-8">
              Flores frescas con entrega a domicilio en el Baix Penedès.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Link
                to="/catalogo"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-olive-800 text-white rounded-lg font-medium hover:bg-olive-900 transition-colors"
              >
                Ver Catálogo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contacto"
                className="px-6 py-3 text-olive-700 font-medium hover:text-olive-900 transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="flex-1 flex justify-center lg:justify-end">
            <div className="w-[340px] h-[450px] md:w-[400px] md:h-[530px] rounded-2xl overflow-hidden">
              <img
                src="/images/products/hero.png"
                alt="Floristería Alex"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
