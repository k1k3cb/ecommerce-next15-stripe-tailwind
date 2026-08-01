import Carousel from '@/components/carousel';
import { Button } from '@/components/ui/button';
import { stripe } from '@/lib/stripe';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5
  });

  const featured = products.data[0];

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900'>
        <div className='mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:px-12 lg:py-24'>
          {/* Texto */}
          <div className='space-y-6 max-w-lg'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>
              Bienvenido a <span className='text-primary'>SneakDrop</span>
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
              Descubre las mejores zapatillas y ropa urbana al mejor precio. Compra fácil,
              rápido y seguro.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Button
                asChild
                className='rounded-full px-6 py-3 text-lg shadow-lg hover:shadow-xl transition'
              >
                <Link href='/products'>Explorar Productos</Link>
              </Button>
              <Button
                variant='outline'
                asChild
                className='rounded-full px-6 py-3 text-lg border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
              >
                <Link href='/about'>Conócenos</Link>
              </Button>
            </div>
          </div>

          {/* Imagen destacada */}
          {featured?.images?.[0] && (
            <div className='relative mt-10 lg:mt-0'>
              <Image
                alt={featured.name}
                width={600}
                height={600}
                src={featured.images[0]}
                className='rounded-2xl shadow-2xl object-cover'
                priority
              />
              {/* Glow */}
              <div className='absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl'></div>
            </div>
          )}
        </div>
      </section>

      {/* Sección de carrusel */}
      <section className='py-16 bg-gray-50 dark:bg-gray-900'>
        <div className='mx-auto max-w-6xl px-6 text-center space-y-6'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
            Productos destacados
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Mira nuestra selección de productos más populares y encuentra lo que
            necesitas.
          </p>
        </div>
        <div className='mt-10'>
          <Carousel products={products.data} />
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black dark:bg-gray-900 text-white py-10 mt-16' role='contentinfo'>
        <div className='mx-auto max-w-6xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-sm'>
            &copy; {new Date().getFullYear()} SneakDrop. Todos los derechos
            reservados.
          </p>
          <div className='flex gap-6 text-sm'>
            <Link href='/privacy' className='hover:underline'>
              Privacidad
            </Link>
            <Link href='/terms' className='hover:underline'>
              Términos
            </Link>
            <Link href='/contact' className='hover:underline'>
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
