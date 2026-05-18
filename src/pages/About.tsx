import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Leaf,
  Award,
  Truck,
  ChevronRight,
  MapPin,
  Clock,
  MessageCircle,
  Flower2,
} from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../components/ui/Button';
import SpotlightCard from '../components/ui/SpotlightCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import DeliveryMap from '../components/ui/DeliveryMap';

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description:
        'Cada ramo es creado con amor y dedicación, cuidando cada detalle.',
    },
    {
      icon: Leaf,
      title: 'Frescura',
      description:
        'Flores frescas seleccionadas diariamente para máxima calidad.',
    },
    {
      icon: Award,
      title: 'Calidad',
      description:
        'Productos premium con atención personalizada para cada cliente.',
    },
    {
      icon: Truck,
      title: 'Entrega Local',
      description:
        'Servicio a domicilio en Baix Penedès, Alt Penedès y El Garraf.',
    },
  ];

  const deliveryZones = [
    'Cunit',
    'Cubelles',
    'Segur de Calafell',
    'Calafell',
    'El Vendrell',
    'Sant Vicenç de Calders',
    'Vilanova i la Geltrú',
    'Sitges',
    'Vilafranca del Penedès',
    'Sant Sadurní d\'Anoia',
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-olive-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-olive-500 hover:text-olive-700 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-olive-300" />
            <span className="text-olive-800 font-medium">Nosotros</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/products/hero.png"
            alt="Floristería Alex"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/80 via-olive-900/60 to-olive-900/40" />
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="hero-content max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Flower2 className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium text-white/90">Desde 2009 en Cunit</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Floristería Alex
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Tu floristería de confianza en el Baix Penedès. Creamos arreglos florales
              únicos con flores frescas y entrega a domicilio.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative -mt-16 z-20">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-xl border border-olive-100 p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-olive-800 mb-1">
                  <AnimatedCounter end={15} suffix="+" />
                </p>
                <p className="text-olive-500 text-sm">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-olive-800 mb-1">
                  <AnimatedCounter end={5000} suffix="+" />
                </p>
                <p className="text-olive-500 text-sm">Clientes satisfechos</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-olive-800 mb-1">
                  <AnimatedCounter end={3} />
                </p>
                <p className="text-olive-500 text-sm">Comarcas de cobertura</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-olive-800 mb-1">
                  <AnimatedCounter end={24} suffix="h" />
                </p>
                <p className="text-olive-500 text-sm">Entrega express</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                Nuestra Historia
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-olive-900 mb-6 leading-tight">
                Tu floristería local en el corazón del Penedès
              </h2>
              <div className="space-y-4 text-olive-600 leading-relaxed">
                <p>
                  Floristería Alex es mucho más que una tienda de flores. Somos
                  parte de la comunidad de Cunit y del Baix Penedès, acompañando
                  a nuestros vecinos en los momentos más importantes de sus vidas.
                </p>
                <p>
                  Nuestra pasión es crear arreglos florales únicos que transmitan
                  emociones. Trabajamos con flores frescas seleccionadas
                  cuidadosamente para garantizar la máxima calidad y durabilidad.
                </p>
                <p>
                  Ofrecemos servicio de entrega a domicilio en toda la comarca
                  del Baix Penedès, Alt Penedès y El Garraf.
                </p>
              </div>

              {/* Location Info */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3 text-olive-700">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-medium">Av. Barcelona, 195, Cunit</span>
                </div>
                <div className="flex items-center gap-3 text-olive-700">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-medium">Lun-Vie: 9:00-20:00</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/50 to-cream-200/50 rounded-3xl rotate-3" />
              <img
                src="/images/products/ramo-8.png"
                alt="Floristería Alex en Cunit"
                className="relative rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 font-medium text-sm tracking-wider uppercase mb-4 block">
              Lo que nos define
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-olive-900 mb-4">
              Nuestro Compromiso
            </h2>
            <p className="text-olive-600 max-w-2xl mx-auto">
              En Floristería Alex nos comprometemos a ofrecer siempre la mejor
              calidad y servicio a nuestros clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <SpotlightCard key={index} className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-olive-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-olive-600 leading-relaxed">{value.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Zones Section with Interactive Map */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 font-medium text-sm tracking-wider uppercase mb-4 block">
              Cobertura
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-olive-900 mb-4">
              Zona de Reparto
            </h2>
            <p className="text-olive-600 max-w-2xl mx-auto">
              Realizamos entregas a domicilio de lunes a sábado. Pedidos
              antes de las 14:00 pueden entregarse el mismo día.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Delivery zones list */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-olive-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-olive-600 to-olive-700 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-olive-900">
                      Entrega a Domicilio
                    </h3>
                    <p className="text-sm text-olive-500">3 comarcas cubiertas</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {deliveryZones.map((zone) => (
                    <span
                      key={zone}
                      className="px-3 py-1.5 bg-cream-100 hover:bg-primary-100 text-olive-700 hover:text-olive-800 rounded-full text-sm font-medium transition-colors cursor-default"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-olive-700 to-olive-800 rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-2">Entrega Express</h4>
                <p className="text-olive-200 text-sm mb-4">
                  Pedidos realizados antes de las 14:00 se entregan el mismo día.
                </p>
                <div className="flex items-center gap-2 text-primary-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Lun - Sáb disponible</span>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="lg:col-span-3">
              <DeliveryMap />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">
                ¿Tienes alguna pregunta?
              </h3>
              <p className="text-green-100 text-lg">
                Escríbenos por WhatsApp y te atendemos al momento
              </p>
            </div>
            <a
              href="https://wa.me/34633641074?text=Hola,%20me%20gustaría%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-olive-800">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
            Descubre nuestra colección
          </h2>
          <p className="text-lg text-olive-200 mb-10 max-w-2xl mx-auto">
            Explora nuestro catálogo de flores frescas, plantas y arreglos
            florales para cada ocasión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogo">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white hover:bg-cream-100 text-olive-800"
              >
                Ver Catálogo
              </Button>
            </Link>
            <Link to="/contacto">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
