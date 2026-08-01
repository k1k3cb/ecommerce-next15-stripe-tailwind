import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Shield, Headphones, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Conoce SneakDrop, tu tienda de confianza para zapatillas y ropa urbana. Envíos rápidos, pago seguro y atención personalizada.'
};

const values = [
  {
    icon: Truck,
    title: 'Envío rápido',
    description: 'Recibe tus zapatillas en 24-48h en península.'
  },
  {
    icon: Shield,
    title: 'Pago 100% seguro',
    description: 'Tus datos protegidos con cifrado SSL y Stripe.'
  },
  {
    icon: Headphones,
    title: 'Atención cercana',
    description: 'Soporte por chat y email, sin bots ni respuestas genéricas.'
  }
];

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
      {/* Hero */}
      <section className='relative py-20 sm:py-28 overflow-hidden'>
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl' />
        </div>
        <div className='max-w-3xl mx-auto text-center px-4 space-y-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white'>
            Más que una tienda,{' '}
            <span className='text-primary'>una cultura</span>
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto'>
            SneakDrop nace de la pasión por las zapatillas y la cultura urbana.
            Seleccionamos cada producto pensando en quienes buscan algo más que
            ropa: buscan identidad.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className='py-16 sm:py-24 bg-gray-50 dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6'>
            <p className='text-sm font-semibold text-primary uppercase tracking-wider'>
              Nuestra historia
            </p>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
              De la calle a tu puerta
            </h2>
            <div className='space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed'>
              <p>
                Empezamos en 2024 con una idea simple: las mejores zapatillas no
                deberían ser difíciles de encontrar. Creamos SneakDrop para
                acercarte modelos exclusivos y ediciones limitadas sin que tengas
                que hacer cola ni pagar precios desorbitados.
              </p>
              <p>
                Cada par que vendemos pasa por nuestro equipo de verificación.
                Trabajamos directamente con distribuidores oficiales para
                garantizar que lo que llega a tus manos es 100% auténtico.
              </p>
            </div>
          </div>
          <div className='relative'>
            <div className='aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center'>
              <span className='text-[8rem] font-black text-gray-200 dark:text-gray-800 select-none leading-none'>
                SD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className='py-16 sm:py-24'>
        <div className='max-w-5xl mx-auto px-4'>
          <div className='text-center mb-12 space-y-3'>
            <p className='text-sm font-semibold text-primary uppercase tracking-wider'>
              Por qué elegirnos
            </p>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
              Lo que nos mueve
            </h2>
          </div>
          <div className='grid sm:grid-cols-3 gap-6'>
            {values.map(item => (
              <Card
                key={item.title}
                className='text-center border-0 shadow-md dark:shadow-none dark:border dark:border-gray-800'
              >
                <CardContent className='pt-8 pb-6 px-6 space-y-4'>
                  <div className='mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center'>
                    <item.icon className='w-6 h-6 text-primary' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                    {item.title}
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 sm:py-24 bg-gray-900 dark:bg-gray-950'>
        <div className='max-w-3xl mx-auto text-center px-4 space-y-8'>
          <h2 className='text-3xl sm:text-4xl font-bold text-white'>
            ¿Listo para tu próximo par?
          </h2>
          <p className='text-gray-400 text-lg max-w-xl mx-auto'>
            Explora nuestra colección y encuentra las zapatillas que van con tu
            estilo.
          </p>
          <Button asChild size='lg' className='px-8 text-lg'>
            <Link href='/products' className='flex items-center gap-2'>
              Ver productos
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
