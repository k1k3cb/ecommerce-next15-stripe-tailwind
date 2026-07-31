'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';
import Stripe from 'stripe';
import ProductCard from './product-card';
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

const ProductList = ({ products }: ProductProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = products.filter(product => {
    const term = debouncedSearch?.toLowerCase() ?? '';
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description?.toLowerCase().includes(term);

    const matchesSearch = nameMatch || descriptionMatch;

    const category = product.metadata?.category?.toLowerCase();
    const matchesCategory =
      selectedCategory === 'all' || selectedCategory === category;

    return matchesSearch && matchesCategory;
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

      {/* Result count */}
      <AnimatePresence mode='wait'>
        <motion.p
          key={filteredProducts.length}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className='text-sm text-gray-500 dark:text-gray-400 mb-4 text-center'
        >
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </motion.p>
      </AnimatePresence>

      {/* Grid de productos */}
      <motion.div
        layout
        className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
                Intenta con otros términos de búsqueda
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Limpiar filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductList;
