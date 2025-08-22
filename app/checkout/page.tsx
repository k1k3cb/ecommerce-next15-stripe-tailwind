'use client';

import checkoutAction from '@/actions/checkout-action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';

const CheckoutPage = () => {
  const { items, addOrIncreaseItem, decreaseQuantity, clearCart } =
    useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0 || total === 0) {
    return (
      <div className='flex flex-col items-center justify-center text-center py-16'>
        <h2 className='text-2xl font-bold mb-2'>🛒 Tu carrito está vacío</h2>
        <p className='text-gray-600 mb-6'>
          Parece que aún no has añadido ningún producto.
        </p>
        <Link href='/products'>
          <Button size='lg' className='px-6 py-3 text-lg cursor-pointer'>
            Ver productos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Finalizar compra</h1>
      <Card className='p-4 mb-4 max-w-2xl mx-auto'>
        <CardHeader className='mb-2'>
          <CardTitle className='text-xl font-semibold'>
            Resumen del pedido
          </CardTitle>
        </CardHeader>
        <CardContent className='text-gray-700'>
          <ul className='space-y-6'>
            {items.map(item => (
              <li key={item.id} className='flex items-center gap-4'>
                {/* Imagen mini */}
                {item.imageUrl && (
                  <div className='w-16 h-16 relative rounded-lg overflow-hidden shadow'>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className='object-cover'
                      sizes='64px'
                    />
                  </div>
                )}

                {/* Info + controles */}
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>{item.name}</span>
                    <span className='font-semibold'>
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Controles */}
                  <div className='flex items-center gap-4 mt-2'>
                    <Button
                      onClick={() => decreaseQuantity(item.id)}
                      variant='outline'
                      className='w-10 h-10 text-lg'
                      disabled={item.quantity === 0}
                    >
                      -
                    </Button>
                    <span className='text-xl font-semibold w-6 text-center'>
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() =>
                        addOrIncreaseItem({
                          ...item,
                          quantity: 1 // siempre suma 1
                        })
                      }
                      variant='outline'
                      className='w-10 h-10 text-lg'
                    >
                      +
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-6 font-bold text-xl text-right'>
            Total: €{total.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <form action={checkoutAction} className='max-w-2xl mx-auto space-y-3'>
        <input type='hidden' name='items' value={JSON.stringify(items)} />
        <Button
          type='submit'
          variant='default'
          className='w-full py-3 text-lg font-semibold              
             text-white shadow-md bg-gray-800 
             hover:bg-black hover:shadow-lg
             transition-all duration-300 cursor-pointer'
        >
          Proceder al pago
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={clearCart}
          className='w-full py-3 text-lg font-semibold text-red-600 border-red-300 hover:bg-red-50 cursor-pointer'
        >
          Vaciar carrito
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
