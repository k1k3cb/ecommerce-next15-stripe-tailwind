import { stripe } from '@/lib/stripe';
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const maxDuration = 30;

interface ProductEntry {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  gender: string;
  brand: string;
  colorway: string;
  material: string;
  silhouette: string;
  release_type: string;
  sizes: string;
}

function buildCatalog(products: ProductEntry[]): string {
  return products
    .map(
      p =>
        `- [${p.id}] ${p.name} | ${p.price} | Cat: ${p.category} | Género: ${p.gender} | Marca: ${p.brand} | Color: ${p.colorway} | Material: ${p.material} | Silueta: ${p.silhouette} | Tipo: ${p.release_type} | Tallas: ${p.sizes} | ${p.description}`
    )
    .join('\n');
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const products = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100
    });

    const catalog: ProductEntry[] = products.data.map(p => {
      const price = p.default_price as import('stripe').Stripe.Price;
      return {
        id: p.id,
        name: p.name,
        price: price?.unit_amount
          ? `${(price.unit_amount / 100).toFixed(2)} EUR`
          : 'Sin precio',
        description: p.description || '',
        category: p.metadata?.category || 'general',
        gender: p.metadata?.gender || 'unisex',
        brand: p.metadata?.brand || '',
        colorway: p.metadata?.colorway || '',
        material: p.metadata?.material || '',
        silhouette: p.metadata?.silhouette || '',
        release_type: p.metadata?.release_type || '',
        sizes: p.metadata?.sizes || ''
      };
    });

    const catalogText = buildCatalog(catalog);

    const systemPrompt = `Eres el asistente virtual de SneakDrop, una tienda de sneakers y streetwear. Responde SIEMPRE en español.

CATÁLOGO (cada producto tiene: id, nombre, precio, categoría, género, marca, color, material, silueta, tipo de lanzamiento, tallas):
${catalogText}

CAMPOS DISPONIBLES PARA BUSCAR/FILTRAR:
- category: clothes, shoes, complements
- gender: Hombre, Mujer, Unisex
- brand: Nike, Adidas, New Balance, Jordan, Puma, Converse, Vans...
- colorway: Negro, Blanco, Rojo, Azul, Verde, Multicolor...
- material: Cuero, Sintético, Textil, Malla, Ante
- silhouette: Air Force 1, Dunk, Yeezy, Samba, 550...
- release_type: New Drop, Restock, Limited, Sale

REGLAS CRÍTICAS:
1. SOLO recomienda productos que EXISTAN en el catálogo de arriba. NUNCA inventes productos.
2. Cuando el usuario pida filtrar por un criterio (ej: "para mujer", "Nike", "rojos"), BUSCA en el catálogo los productos cuyo metadata coincida EXACTAMENTE. No supongas.
3. Si no hay productos que coincidan, dilo claramente: "No tenemos productos con esos criterios en este momento."
4. Responde de forma breve (máximo 4-5 líneas). Incluye nombre y precio de cada producto recomendado.
5. Si preguntan por envíos: "Envío gratis en pedidos superiores a 50 EUR. Entrega en 2-5 días laborables."
6. Si preguntan por devoluciones: "Devoluciones gratuitas dentro de los 30 días tras la compra."
7. Si preguntan por pagos: "Aceptamos tarjeta de crédito/débito a través de Stripe."
8. Si no sabes algo, di que contacten con soporte.
9. Usa emojis con moderación.`;

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.4,
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
