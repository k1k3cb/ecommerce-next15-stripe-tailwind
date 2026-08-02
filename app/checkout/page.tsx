'use client';

import checkoutAction from '@/actions/checkout-action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { useCartStore } from '@/store/cart-store';
import { useSession } from '@/lib/auth-client';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { items, addOrIncreaseItem, decreaseQuantity, clearCart } =
    useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0 || total === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className='w-12 h-12 text-gray-400 dark:text-gray-500' />}
        title='Tu carrito está vacío'
        description='Parece que aún no has añadido ningún producto. ¡Explora nuestro catálogo y encuentra algo que te guste!'
        action={{
          label: 'Explorar productos',
          href: '/products'
        }}
      />
    );
  }

  const handleCheckout = () => {
    if (!session) {
      toast.info('Inicia sesión para finalizar la compra');
      router.push('/auth/login?redirectTo=/checkout');
      return;
    }
    // If logged in, submit the form programmatically
    const form = document.getElementById('checkout-form') as HTMLFormElement;
    form?.requestSubmit();
  };

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
              <li key={`${item.id}-${item.size}`} className='flex items-center gap-4'>
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
                    <div>
                      <span className='font-medium'>{item.name}</span>
                      {item.size && (
                        <span className='text-sm text-gray-500 ml-2'>Talla {item.size}</span>
                      )}
                    </div>
                    <span className='font-semibold'>
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Controles */}
                  <div className='flex items-center gap-4 mt-2'>
                    <Button
                      onClick={() => decreaseQuantity(item.id, item.size)}
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
                          quantity: 1
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
      <form action={checkoutAction} id='checkout-form' className='max-w-2xl mx-auto space-y-3'>
        <input type='hidden' name='items' value={JSON.stringify(items)} />
      </form>

      <div className='max-w-2xl mx-auto space-y-3'>
        <Button
          type='button'
          onClick={handleCheckout}
          variant='default'
          className='w-full py-3 text-lg font-semibold              
             text-white shadow-md bg-gray-800 
             hover:bg-black hover:shadow-lg
             transition-all duration-300 cursor-pointer'
        >
          {session ? 'Proceder al pago' : 'Iniciar sesión para pagar'}
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={() => {
            clearCart();
            toast.info('Carrito vaciado');
          }}
          className='w-full py-3 text-lg font-semibold text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer'
        >
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
