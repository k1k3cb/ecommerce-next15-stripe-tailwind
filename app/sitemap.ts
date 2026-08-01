import { stripe } from '@/lib/stripe';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    }
  ];

  try {
    const products = await stripe.products.list({ limit: 100 });
    const productPages: MetadataRoute.Sitemap = products.data.map(product => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updated * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }));

    return [...staticPages, ...productPages];
  } catch {
    return staticPages;
  }
}
