'use client';

import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import Stripe from 'stripe';
import ProductCard from './product-card';
import ProductFilters, { type ActiveFilters, type FilterConfig } from './product-filters';
import { Button } from './ui/button';
import { useDebounce } from '@/hooks/use-debounce';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductProps {
  products: Stripe.Product[];
}

// categorías internas (en inglés, como vienen en metadata)
const categories = ['all', 'clothes', 'shoes', 'complements'] as const;

// traducciones visibles al usuario
const categoryMap: Record<(typeof categories)[number], string> = {
  all: 'Todos',
  clothes: 'Ropa',
  shoes: 'Zapatos',
  complements: 'Complementos'
};

const defaultFilters: ActiveFilters = {
  brands: [],
  colorways: [],
  genders: [],
  releaseTypes: [],
  materials: [],
  silhouettes: [],
  priceMin: null,
  priceMax: null,
};

const ProductList = ({ products }: ProductProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(defaultFilters);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Extraer config de filtros disponibles de los productos
  const filterConfig = useMemo<FilterConfig>(() => {
    const extractUnique = (key: string) =>
      [...new Set(products.map(p => p.metadata?.[key]).filter(Boolean))] as string[];

    const prices = products
      .map(p => (p.default_price as Stripe.Price)?.unit_amount)
      .filter((n): n is number => n != null);

    return {
      brand: extractUnique('brand').sort(),
      colorway: extractUnique('colorway').sort(),
      gender: extractUnique('gender').sort(),
      release_type: extractUnique('release_type').sort(),
      material: extractUnique('material').sort(),
      silhouette: extractUnique('silhouette').sort(),
      priceRange: {
        min: prices.length > 0 ? Math.floor(Math.min(...prices) / 100) : 0,
        max: prices.length > 0 ? Math.ceil(Math.max(...prices) / 100) : 0,
      },
    };
  }, [products]);

  const hasAnyFilterConfig =
    filterConfig.brand.length > 0 ||
    filterConfig.colorway.length > 0 ||
    filterConfig.gender.length > 0 ||
    filterConfig.release_type.length > 0 ||
    filterConfig.material.length > 0 ||
    filterConfig.silhouette.length > 0;

  const filteredProducts = products.filter(product => {
    // Búsqueda por texto
    const term = debouncedSearch?.toLowerCase() ?? '';
    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      false;

    // Categoría
    const category = product.metadata?.category?.toLowerCase();
    const matchesCategory =
      selectedCategory === 'all' || selectedCategory === category;

    // Filtros de metadata
    const matchesBrand =
      activeFilters.brands.length === 0 ||
      activeFilters.brands.includes(product.metadata?.brand ?? '');

    const matchesColorway =
      activeFilters.colorways.length === 0 ||
      activeFilters.colorways.includes(product.metadata?.colorway ?? '');

    const matchesGender =
      activeFilters.genders.length === 0 ||
      activeFilters.genders.includes(product.metadata?.gender ?? '');

    const matchesRelease =
      activeFilters.releaseTypes.length === 0 ||
      activeFilters.releaseTypes.includes(product.metadata?.release_type ?? '');

    const matchesMaterial =
      activeFilters.materials.length === 0 ||
      activeFilters.materials.includes(product.metadata?.material ?? '');

    const matchesSilhouette =
      activeFilters.silhouettes.length === 0 ||
      activeFilters.silhouettes.includes(product.metadata?.silhouette ?? '');

    // Precio
    const price = (product.default_price as Stripe.Price)?.unit_amount;
    const priceEuros = price != null ? price / 100 : null;

    const matchesPriceMin =
      activeFilters.priceMin === null || (priceEuros !== null && priceEuros >= activeFilters.priceMin);

    const matchesPriceMax =
      activeFilters.priceMax === null || (priceEuros !== null && priceEuros <= activeFilters.priceMax);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesColorway &&
      matchesGender &&
      matchesRelease &&
      matchesMaterial &&
      matchesSilhouette &&
      matchesPriceMin &&
      matchesPriceMax
    );
  });

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      {/* Barra de búsqueda */}
      <div className='relative mb-6 max-w-md mx-auto'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Buscar productos...'
          className='w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all'
        />
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer'
            >
              <X className='w-5 h-5' />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filtro de categorías */}
      <div className='flex justify-center gap-3 mb-10 flex-wrap'>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className='capitalize'
          >
            {categoryMap[cat]}
          </Button>
        ))}
      </div>

      {/* Contenido con filtros laterales */}
      <div className='flex gap-8'>
        {/* Filtros laterales (solo si hay metadata disponible) */}
        {hasAnyFilterConfig && (
          <ProductFilters
            config={filterConfig}
            active={activeFilters}
            onChange={setActiveFilters}
          />
        )}

        {/* Resultados */}
        <div className='flex-1 min-w-0'>
          {/* Result count */}
          <AnimatePresence mode='wait'>
            <motion.p
              key={filteredProducts.length}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='text-sm text-gray-500 dark:text-gray-400 mb-4'
            >
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </motion.p>
          </AnimatePresence>

          {/* Grid de productos */}
          <motion.div
            layout
            className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-center text-gray-500 dark:text-gray-400 col-span-full py-12'
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Search className='w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600' />
                  </motion.div>
                  <p className='text-lg font-medium'>No se encontraron productos</p>
                  <p className='text-sm text-gray-400 dark:text-gray-500 mt-1 mb-4'>
                    Intenta con otros términos de búsqueda o ajusta los filtros
                  </p>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setActiveFilters(defaultFilters);
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
