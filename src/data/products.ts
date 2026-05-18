import type { Product, CategoryInfo, Testimonial } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'ramos',
    name: 'Ramos y Flores',
    description: 'Ramos frescos para cada ocasión especial',
    image: '/images/products/ramo-1.png',
  },
  {
    id: 'plantas-interior',
    name: 'Plantas',
    description: 'Plantas de interior y orquídeas',
    image: '/images/products/planta-1.png',
  },
  {
    id: 'arreglos',
    name: 'Centros y Arreglos',
    description: 'Composiciones florales elegantes',
    image: '/images/products/centro-1.png',
  },
  {
    id: 'ocasiones-especiales',
    name: 'Ocasiones Especiales',
    description: 'Bodas, nacimientos y celebraciones',
    image: '/images/products/ramo-3.png',
  },
  {
    id: 'bonsais',
    name: 'Rosa Eterna',
    description: 'Rosas preservadas que duran para siempre',
    image: '/images/products/ramo-4.png',
  },
  {
    id: 'plantas-exterior',
    name: 'Funerario',
    description: 'Coronas y centros para honrar la memoria',
    image: '/images/products/centro-2.png',
  },
];

export const products: Product[] = [
  // RAMOS Y FLORES
  {
    id: '1',
    name: '12 Rosas Rojas',
    description: 'Clásico ramo de 12 rosas rojas premium. El regalo perfecto para expresar amor y pasión. Incluye tarjeta personalizada gratuita.',
    price: 45,
    image: '/images/products/ramo-1.png',
    category: 'ramos',
    occasion: ['amor', 'aniversario'],
    featured: true,
    bestseller: true,
    stock: 25,
    careInstructions: 'Cambiar el agua cada 2 días. Cortar los tallos en diagonal.',
  },
  {
    id: '2',
    name: 'Rosas Amarillas',
    description: 'Luminoso ramo de rosas amarillas que transmite alegría y amistad. Perfecto para celebrar momentos especiales.',
    price: 35,
    image: '/images/products/ramo-2.png',
    category: 'ramos',
    occasion: ['cumpleanos', 'agradecimiento'],
    featured: true,
    stock: 18,
    careInstructions: 'Mantener en lugar fresco, alejado de la luz directa del sol.',
  },
  {
    id: '3',
    name: 'Destellos de Atardecer',
    description: 'Elegante ramo de tulipanes naranjas con toques púrpura y verdes intensos. Frescura y elegancia.',
    price: 39.95,
    image: '/images/products/ramo-3.png',
    category: 'ramos',
    occasion: ['cumpleanos', 'agradecimiento'],
    featured: true,
    stock: 15,
    careInstructions: 'Los tulipanes siguen creciendo en el jarrón. Agua fresca cada día.',
  },
  {
    id: '4',
    name: 'Ramo Silvestre',
    description: 'Colorida mezcla de flores silvestres que captura la esencia de la naturaleza. Alegría en cada pétalo.',
    price: 38,
    image: '/images/products/ramo-4.png',
    category: 'ramos',
    occasion: ['cumpleanos'],
    bestseller: true,
    stock: 20,
    careInstructions: 'Cambiar el agua diariamente. Les encanta la luz.',
  },
  {
    id: '5',
    name: 'Rosa Spray',
    description: 'Delicado ramo de rosas spray en tonos suaves. Romántico y sofisticado.',
    price: 36,
    image: '/images/products/ramo-5.png',
    category: 'ramos',
    occasion: ['amor', 'aniversario'],
    stock: 16,
    careInstructions: 'Cortar tallos en diagonal. Agua limpia cada 2 días.',
  },
  {
    id: '6',
    name: 'Ramo del Florista',
    description: 'Ramo personalizado creado por nuestro florista con las flores más frescas del día. Cada ramo es único.',
    price: 36,
    originalPrice: 69,
    image: '/images/products/ramo-6.png',
    category: 'ramos',
    occasion: ['cumpleanos', 'agradecimiento'],
    featured: true,
    stock: 30,
    careInstructions: 'Instrucciones específicas incluidas con cada ramo.',
  },
  {
    id: '7',
    name: 'Ramo Precioso',
    description: 'Explosión de color con flores de temporada. Un ramo alegre y vibrante para cualquier ocasión.',
    price: 30,
    originalPrice: 69,
    image: '/images/products/ramo-7.png',
    category: 'ramos',
    occasion: ['cumpleanos'],
    stock: 22,
    careInstructions: 'Mantener en agua fresca. Duración aproximada 7-10 días.',
  },
  {
    id: '8',
    name: 'Bouquet Elegante',
    description: 'Exquisito arreglo de flores premium presentado con elegancia. Lujo y sofisticación.',
    price: 69,
    image: '/images/products/ramo-8.png',
    category: 'ramos',
    occasion: ['amor', 'aniversario'],
    featured: true,
    stock: 8,
    careInstructions: 'Cambiar agua cada día para mayor duración.',
  },
  {
    id: '9',
    name: 'Composición Romántica',
    description: 'Íntima composición de flores con verde decorativo. El detalle perfecto.',
    price: 30,
    image: '/images/products/ramo-9.png',
    category: 'ramos',
    occasion: ['amor'],
    stock: 25,
    careInstructions: 'Cambiar agua cada 2-3 días.',
  },
  {
    id: '10',
    name: 'Ramo Premium',
    description: 'Ramo de alta gama con las flores más selectas. Para ocasiones verdaderamente especiales.',
    price: 85,
    image: '/images/products/ramo-10.png',
    category: 'ramos',
    occasion: ['aniversario', 'amor'],
    featured: true,
    stock: 10,
    careInstructions: 'Mantener en lugar fresco. Cambiar agua diariamente.',
  },

  // PLANTAS
  {
    id: '11',
    name: 'Phalaenopsis Bicolor',
    description: 'Espectacular orquídea bicolor en maceta decorativa. Una planta que florece durante meses.',
    price: 70,
    image: '/images/products/planta-1.png',
    category: 'plantas-interior',
    featured: true,
    bestseller: true,
    stock: 10,
    careInstructions: 'Regar una vez por semana. Luz indirecta brillante. No mojar las hojas.',
  },
  {
    id: '12',
    name: 'Cesta de Plantas',
    description: 'Bonita cesta con variedad de plantas verdes. Un regalo duradero y decorativo.',
    price: 50,
    image: '/images/products/planta-2.png',
    category: 'plantas-interior',
    occasion: ['agradecimiento', 'cumpleanos'],
    stock: 15,
    careInstructions: 'Regar moderadamente. Cada planta tiene sus propias necesidades.',
  },

  // CENTROS Y ARREGLOS
  {
    id: '13',
    name: 'Centro Floral',
    description: 'Espectacular centro de flores variadas. Perfecto para decoración o regalo.',
    price: 68,
    originalPrice: 119,
    image: '/images/products/centro-1.png',
    category: 'arreglos',
    occasion: ['cumpleanos', 'nacimiento'],
    featured: true,
    stock: 10,
    careInstructions: 'Mantener el oasis húmedo. Duración aproximada: 7-10 días.',
  },
  {
    id: '14',
    name: 'Centro Elegante',
    description: 'Impresionante centro de flores premium. Una obra de arte floral.',
    price: 120,
    image: '/images/products/centro-2.png',
    category: 'arreglos',
    featured: true,
    stock: 5,
    careInstructions: 'Mantener húmedo. Evitar luz solar directa.',
  },
  {
    id: '15',
    name: 'Centro Premium XL',
    description: 'Majestuoso centro con abundancia de flores. El máximo exponente de elegancia floral.',
    price: 180,
    image: '/images/products/centro-3.png',
    category: 'arreglos',
    occasion: ['aniversario', 'boda'],
    stock: 3,
    careInstructions: 'Requiere cuidado especial. Mantener fresco y húmedo.',
  },
  {
    id: '16',
    name: 'Centro en Madera',
    description: 'Elegante centro floral presentado en base de madera natural. Rústico y sofisticado.',
    price: 80,
    image: '/images/products/centro-madera.png',
    category: 'arreglos',
    stock: 8,
    careInstructions: 'Mantener el oasis húmedo.',
  },

  // OCASIONES ESPECIALES
  {
    id: '17',
    name: 'Centro Nacimiento',
    description: 'Tierno arreglo en tonos pastel para celebrar la llegada de un nuevo miembro a la familia.',
    price: 65,
    image: '/images/products/ramo-9.png',
    category: 'ocasiones-especiales',
    occasion: ['nacimiento'],
    featured: true,
    stock: 10,
    careInstructions: 'Incluye peluche opcional. Flores duran 5-7 días.',
  },

  // ROSA ETERNA
  {
    id: '18',
    name: 'Rosa Eterna en Cúpula',
    description: 'Rosa natural preservada en elegante cúpula de cristal. Dura años sin necesidad de agua ni cuidados.',
    price: 54,
    image: '/images/products/ramo-4.png',
    category: 'bonsais',
    featured: true,
    bestseller: true,
    stock: 15,
    careInstructions: 'No requiere agua ni luz. Evitar humedad excesiva. Duración: 2-3 años.',
  },

  // FUNERARIO
  {
    id: '19',
    name: 'Corona Funeraria',
    description: 'Corona de flores blancas y verdes para honrar la memoria de seres queridos. Diseño solemne y elegante.',
    price: 189,
    image: '/images/products/centro-2.png',
    category: 'plantas-exterior',
    occasion: ['condolencias'],
    stock: 5,
    careInstructions: 'Entrega el mismo día en pedidos antes de las 14:00.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María G.',
    text: 'Pedí un ramo para mi madre en Cunit y llegó precioso. Servicio muy rápido y atento. Repetiré seguro.',
    rating: 5,
    date: '2024-03-15',
  },
  {
    id: '2',
    name: 'Carlos R.',
    text: 'Las flores llegaron frescas a Vilanova. El ramo de rosas superó mis expectativas. Excelente calidad.',
    rating: 5,
    date: '2024-03-20',
  },
  {
    id: '3',
    name: 'Ana M.',
    text: 'Compré una orquídea y vino perfectamente empaquetada. Muy profesionales. La planta está preciosa.',
    rating: 5,
    date: '2024-04-01',
  },
  {
    id: '4',
    name: 'Pedro S.',
    text: 'Servicio impecable para el centro de flores del tanatorio. Rapidez y delicadeza en un momento difícil.',
    rating: 5,
    date: '2024-04-10',
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter((p) => p.bestseller);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
  );
};
