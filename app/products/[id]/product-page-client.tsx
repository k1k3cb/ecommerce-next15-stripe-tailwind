'use client';

import ProductDetail from '@/components/product-detail';
import { ProductSchema } from '@/components/product-schema';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Stripe from 'stripe';

interface ProductPageClientProps {
  product: Stripe.Product;
}

const ProductPageClient = ({ product }: ProductPageClientProps) => {
  return (
    <>
      <ProductSchema product={product} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
      >
        {/* Breadcrumbs */}
        <nav aria-label='Breadcrumb' className='flex items-center text-sm text-gray-500 space-x-2'>
          <Link href='/' className='flex items-center gap-1 hover:text-primary'>
            <Home size={16} aria-hidden='true' />
            <span>Inicio</span>
          </Link>
          <span aria-hidden='true'>/</span>
          <Link
            href='/products'
            className='flex items-center gap-1 hover:text-primary'
          >
            <ShoppingBag size={16} aria-hidden='true' />
            <span>Productos</span>
          </Link>
          <span aria-hidden='true'>/</span>
          <span className='text-gray-800 dark:text-gray-200 font-medium truncate max-w-[150px] sm:max-w-xs'>
            {product.name}
          </span>
        </nav>

        {/* Botón volver */}
        <div>
          <Link href='/products'>
            <Button
              variant='outline'
              className='flex items-center gap-2 transition-all hover:gap-3 cursor-pointer'
            >
              <ArrowLeft size={18} aria-hidden='true' />
              Volver a productos
            </Button>
          </Link>
        </div>

        {/* Detalle del producto */}
        <ProductDetail product={product} />
      </motion.div>
    </>
  );
};

export default ProductPageClient;
