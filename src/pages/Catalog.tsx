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
          <p className="text-body max-w-2xl">{pageDescription}</p>
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
