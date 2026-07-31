import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatWidget } from '@/components/chat-widget';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'MyEcommerce',
  description: 'Tu tienda online de confianza'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className='flex min-h-full flex-col bg-accent'>
        <ThemeProvider>
          <Navbar />
          <main className='flex-grow container mx-auto px-4 py-8'>
            {children}
          </main>
          <ChatWidget />
          <Toaster position='bottom-right' richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
