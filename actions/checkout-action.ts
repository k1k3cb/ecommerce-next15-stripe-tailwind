'use server';

import { stripe } from '@/lib/stripe';
import { CartItem } from '@/store/cart-store';
import { redirect } from 'next/navigation';

const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJSON = formData.get('items');
  if (!itemsJSON) {
    throw new Error('No items provided for checkout');
  }
  const items = JSON.parse(itemsJSON as string);

  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.size ? `${item.name} - Talla ${item.size}` : item.name,
        metadata: item.size ? { size: item.size } : {}
      },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`
  });
  redirect(session.url!);
};

export default checkoutAction;
