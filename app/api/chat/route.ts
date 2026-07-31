import { stripe } from '@/lib/stripe';
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const products = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 50
    });

    const catalog = products.data
      .map(p => {
        const price = p.default_price as import('stripe').Stripe.Price;
        const priceFormatted = price?.unit_amount
          ? `€${(price.unit_amount / 100).toFixed(2)}`
          : 'Precio no disponible';
        return `- ${p.name} | ${priceFormatted} | ${p.description || 'Sin descripción'} | Categoría: ${p.metadata?.category || 'general'}`;
      })
      .join('\n');

    const systemPrompt = `Eres el asistente virtual de MyEcommerce, una tienda online. Responde siempre en español.

CATÁLOGO DE PRODUCTOS:
${catalog}

REGLAS:
- Responde de forma breve y amigable (máximo 3-4 líneas)
- Si el usuario busca un producto, recomienda opciones del catálogo con nombre y precio
- Si preguntan por envíos: "Envío gratis en pedidos superiores a €50. Entrega en 2-5 días laborables."
- Si preguntan por devoluciones: "Devoluciones gratuitas dentro de los 30 días tras la compra."
- Si preguntan por pagos: "Aceptamos tarjeta de crédito/débito a través de Stripe."
- Si no sabes algo, di que contacten con soporte
- Usa emojis con moderación para ser más cercano`;

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 512
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu mensaje' },
      { status: 500 }
    );
  }
}
