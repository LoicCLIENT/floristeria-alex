import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getProductById, categories } from '../data/products';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Producto no encontrado</h1>
          <p className="text-body mb-8">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Link to="/catalogo" className="btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.id === product.category);
  const images = product.images || [product.image];

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
              to="/catalogo"
              className="text-gray-500 hover:text-primary-400 transition-colors"
            >
              Catálogo
            </Link>
            {categoryInfo && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link
                  to={`/catalogo/${product.category}`}
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                >
                  {categoryInfo.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={images} productName={product.name} />

          {/* Info */}
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts product={product} />
    </div>
  );
}
