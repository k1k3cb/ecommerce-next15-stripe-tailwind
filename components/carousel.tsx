'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type Stripe from 'stripe';

import { Button } from '@/components/ui/button';
import { CardContent, CardTitle } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pause,
  Play,
  ShoppingCart
} from 'lucide-react';

interface CarouselProps {
  products: Stripe.Product[];
  onProductClick?: (product: Stripe.Product) => void;
  onAddToCart?: (product: Stripe.Product) => void;
  autoPlayInterval?: number;
}

export default function Carousel({
  products,
  onProductClick,
  onAddToCart,
  autoPlayInterval = 4000
}: CarouselProps) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Lógica para avanzar/retroceder en el carrusel
  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Calcula el índice actual del producto de forma segura
  const productIndex =
    ((page % (products?.length || 1)) + (products?.length || 1)) %
    (products?.length || 1);
  const currentProduct = products?.[productIndex];
  const price = currentProduct?.default_price as Stripe.Price;

  const goToSlide = useCallback(
    (index: number) => {
      const newDirection = index > productIndex ? 1 : -1;
      setPage([index, newDirection]);
    },
    [productIndex]
  );

  // Controla el autoplay del carrusel
  useEffect(() => {
    if (
      !products?.length ||
      !isAutoPlaying ||
      isHovered ||
      products.length <= 1
    )
      return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [products?.length, isAutoPlaying, isHovered, autoPlayInterval, paginate]);

  // Maneja la navegación con el teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (products.length <= 1) return;
      if (event.key === 'ArrowLeft') {
        paginate(-1);
      } else if (event.key === 'ArrowRight') {
        paginate(1);
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsAutoPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [products.length, paginate]);

  if (!products || products.length === 0) {
    return (
      <div className='flex items-center justify-center h-80 text-center text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed'>
        <div>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center'>
            <ShoppingCart className='w-8 h-8 text-muted-foreground' />
          </div>
          <p className='text-lg font-medium'>No hay productos disponibles</p>
          <p className='text-sm text-muted-foreground/70'>
            Los productos aparecerán aquí cuando estén disponibles
          </p>
        </div>
      </div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className='relative w-full max-w-2xl mx-auto'>
      <div
        className='relative overflow-hidden rounded-3xl shadow-2xl border border-border/50 bg-card group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative h-96 w-full bg-gradient-to-br from-muted/20 to-muted/40'>
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            <motion.div
              key={page}
              className='absolute inset-0'
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
            >
              <Image
                src={
                  currentProduct?.images?.[0] ||
                  '/placeholder.svg?height=400&width=600&query=product placeholder'
                }
                alt={currentProduct?.name || 'Product'}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </motion.div>
          </AnimatePresence>

          {/* Botones de control del carrusel  */}
          {products.length > 1 && (
            <>
              {/* Botón Izquierda */}
              <Button
                variant='secondary'
                size='icon'
                className='absolute z-10 left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg'
                onClick={() => paginate(-1)}
                aria-label='Producto anterior'
              >
                <ChevronLeft className='h-5 w-5' />
              </Button>

              {/* Botón Derecha */}
              <Button
                variant='secondary'
                size='icon'
                className='absolute z-10 right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg'
                onClick={() => paginate(1)}
                aria-label='Siguiente producto'
              >
                <ChevronRight className='h-5 w-5' />
              </Button>
            </>
          )}

          {/* Botón de Autoplay */}
          {products.length > 1 && (
            <Button
              variant='secondary'
              size='icon'
              className='absolute z-10 top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg'
              onClick={() => setIsAutoPlaying(prev => !prev)}
              aria-label={
                isAutoPlaying ? 'Pausar autoplay' : 'Reanudar autoplay'
              }
            >
              {isAutoPlaying ? (
                <Pause className='h-4 w-4' />
              ) : (
                <Play className='h-4 w-4' />
              )}
            </Button>
          )}
        </div>

        <CardContent className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white'>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='space-y-3'
          >
            <CardTitle className='text-3xl font-bold leading-tight drop-shadow-lg'>
              {currentProduct?.name}
            </CardTitle>

            {currentProduct?.description && (
              <p className='text-sm text-white/90 line-clamp-2 leading-relaxed drop-shadow'>
                {currentProduct.description}
              </p>
            )}

            <div className='flex items-center justify-between pt-2'>
              {price?.unit_amount && (
                <p className='text-2xl font-bold text-white drop-shadow-lg'>
                  €{(price.unit_amount / 100).toFixed(2)}
                </p>
              )}

              <div className='flex gap-2'>
                {onProductClick && (
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() => onProductClick(currentProduct)}
                    className='bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30'
                  >
                    <Eye className='h-4 w-4 mr-2' />
                    Ver
                  </Button>
                )}

                {onAddToCart && (
                  <Button
                    size='sm'
                    onClick={() => onAddToCart(currentProduct)}
                    className='bg-primary hover:bg-primary/90 shadow-lg'
                  >
                    <ShoppingCart className='h-4 w-4 mr-2' />
                    Añadir
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </div>

      {products.length > 1 && (
        <div className='flex justify-center gap-2 mt-6'>
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                idx === productIndex
                  ? 'bg-primary w-8 shadow-lg'
                  : 'bg-muted-foreground/40 w-2 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Ir al producto ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className='absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300'>
        {productIndex + 1} / {products.length}
      </div>
    </div>
  );
}
