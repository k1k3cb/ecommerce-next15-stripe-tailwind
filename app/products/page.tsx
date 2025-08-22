import ProductList from '@/components/product-list';
import { stripe } from '@/lib/stripe';
import { Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const ProductPage = async () => {
  const products = await stripe.products.list({
    expand: ['data.default_price']
  });
  console.log('Products fetched:', products.data);
  return (
    <div>
      <h1 className='text-3xl font-bold mb-5'>Listado de productos</h1>
      {/* Breadcrumb navigation */}
      <nav className='flex items-center text-sm text-gray-500 space-x-2'>
        <Link href='/' className='flex items-center gap-1 hover:text-primary'>
          <Home size={16} />
          <span>Inicio</span>
        </Link>
        <span>/</span>
        <Link
          href='/products'
          className='flex items-center gap-1 hover:text-primary'
        >
          <ShoppingBag size={16} />
          <span>Productos</span>
        </Link>
      </nav>
      <ProductList products={products.data} />
    </div>
  );
};

export default ProductPage;
