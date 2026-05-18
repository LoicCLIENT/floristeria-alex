import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import FlowingMenu from '../components/ui/FlowingMenu';

const menuItems = [
  { link: '/catalogo/ramos', text: 'Ramos', image: '/images/products/ramo-1.png' },
  { link: '/catalogo/plantas-interior', text: 'Plantas', image: '/images/products/planta-1.png' },
  { link: '/catalogo/arreglos', text: 'Arreglos', image: '/images/products/centro-1.png' },
  { link: '/catalogo/ocasiones-especiales', text: 'Eventos', image: '/images/products/ramo-3.png' }
];

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container-custom mb-8">
          <h2 className="heading-2 text-center">Explora Nuestras Categorías</h2>
        </div>
        <div style={{ height: '500px', position: 'relative' }}>
          <FlowingMenu
            items={menuItems}
            marqueeBgColor="#adbf9a"
            marqueeTextColor="#2d3627"
            bgColor="#343e2d"
            textColor="#FDFCFA"
            borderColor="rgba(173,191,154,0.2)"
          />
        </div>
      </section>
      <Categories />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
}
