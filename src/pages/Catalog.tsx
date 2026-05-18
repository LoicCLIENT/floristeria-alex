import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import type { FilterOptions, Category } from '../types';
import ProductGrid from '../components/catalog/ProductGrid';
import Filters from '../components/catalog/Filters';
import SearchBar from '../components/catalog/SearchBar';

export default function Catalog() {
  const { categoria } = useParams<{ categoria: string }>();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: (categoria as Category) || 'all',
    priceRange: undefined,
    sortBy: 'popular',
    searchQuery: '',
  });

  // Update category filter when URL changes
  useEffect(() => {
    if (categoria) {
      setFilters((prev) => ({ ...prev, category: categoria as Category }));
    } else {
      setFilters((prev) => ({ ...prev, category: 'all' }));
    }
  }, [categoria]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  const currentCategory = categories.find((c) => c.id === categoria);
  const pageTitle = currentCategory ? currentCategory.name : 'Catálogo';
  const pageDescription = currentCategory
    ? currentCategory.description
    : 'Explora nuestra colección de flores frescas y plantas';

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-cream-100 py-12 md:py-16">
        <div className="container-custom">
          <h1 className="heading-2 mb-4">{pageTitle}</h1>
          <p className="text-body max-w-2xl mb-6">{pageDescription}</p>

          {/* WhatsApp CTA Banner */}
          <a
            href="https://wa.me/34633641074?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#1da851] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ¿Pedido personalizado? Escríbenos
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={filters.searchQuery || ''}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, searchQuery: value }))
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredProducts.length} productos encontrados
        </p>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-[#FAFAFA] overflow-y-auto">
                <Filters
                  filters={filters}
                  onFilterChange={setFilters}
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
