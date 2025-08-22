'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Stripe from 'stripe';
import ProductCard from './product-card';
import { Button } from './ui/button';

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

  const filteredProducts = products.filter(product => {
    const term = searchTerm?.toLowerCase() ?? '';
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
          className='w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none'
        />
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

      {/* Grid de productos */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className='text-center text-gray-500 col-span-full'>
            No se encontraron productos
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
