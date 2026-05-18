import type { Product } from '../../types';
import { getRelatedProducts } from '../../data/products';
import ProductCard from '../catalog/ProductCard';

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(product, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding border-t border-gray-100">
      <div className="container-custom">
        <h2 className="heading-3 mb-8">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
