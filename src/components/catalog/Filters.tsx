import type { Category, FilterOptions } from '../../types';
import { categories } from '../../data/products';
import { SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Filters({
  filters,
  onFilterChange,
  isOpen = true,
  onClose,
}: FiltersProps) {
  const priceRanges = [
    { label: 'Todos los precios', value: undefined },
    { label: 'Menos de 25€', value: [0, 25] as [number, number] },
    { label: '25€ - 50€', value: [25, 50] as [number, number] },
    { label: '50€ - 100€', value: [50, 100] as [number, number] },
    { label: 'Más de 100€', value: [100, 1000] as [number, number] },
  ];

  const sortOptions = [
    { label: 'Más popular', value: 'popular' as const },
    { label: 'Precio: menor a mayor', value: 'price-asc' as const },
    { label: 'Precio: mayor a menor', value: 'price-desc' as const },
    { label: 'Nombre A-Z', value: 'name' as const },
  ];

  const handleCategoryChange = (category: Category | 'all') => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (priceRange?: [number, number]) => {
    onFilterChange({ ...filters, priceRange });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      priceRange: undefined,
      sortBy: 'popular',
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    (filters.category && filters.category !== 'all') ||
    filters.priceRange ||
    filters.searchQuery;

  return (
    <div
      className={`bg-white rounded-2xl shadow-soft p-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-400 hover:text-primary-500"
          >
            Limpiar
          </button>
        )}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categoría</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !filters.category || filters.category === 'all'
                ? 'bg-primary-50 text-primary-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todas las categorías
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === category.id
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Precio</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceChange(range.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                JSON.stringify(filters.priceRange) === JSON.stringify(range.value)
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Ordenar por</h4>
        <select
          value={filters.sortBy || 'popular'}
          onChange={(e) =>
            handleSortChange(e.target.value as FilterOptions['sortBy'])
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
