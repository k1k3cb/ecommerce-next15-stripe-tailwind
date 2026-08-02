'use client';

import { useCartStore } from '@/store/cart-store';
import { useSession, signOut } from '@/lib/auth-client';
import { Menu, ShoppingCartIcon, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import CartDropdown from './cart-dropdown';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-md' role='navigation' aria-label='Navegación principal'>
      <div className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-extrabold text-gray-900 dark:text-white hover:text-primary transition'
          aria-label='SneakDrop - Ir a inicio'
        >
          Sneak<span className='text-primary'>Drop</span>
        </Link>

        {/* Desktop links */}
        <div className='hidden md:flex space-x-10 text-gray-700 dark:text-gray-300 font-medium'>
          <Link
            href='/'
            className='hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full'
          >
            Inicio
          </Link>
          <Link
            href='/products'
            className='hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full'
          >
            Productos
          </Link>
          <Link
            href='/checkout'
            className='relative flex flex-col items-center hover:scale-105 transition group'
            aria-label={`Carrito de compra, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}`}
          >
            <div className='relative'>
              <ShoppingCartIcon className='w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition' aria-hidden='true' />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shadow' aria-hidden='true'>
                  {cartCount}
                </span>
              )}
            </div>
            <CartDropdown />
          </Link>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-2'>
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className='hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1' aria-hidden='true' />

          {/* Auth */}
          {session ? (
            <div className='hidden md:flex items-center gap-3'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]'>
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className='flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2.5 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 cursor-pointer'
              >
                <LogOut className='w-3.5 h-3.5' />
                Salir
              </button>
            </div>
          ) : (
            <Link
              href='/auth/login'
              className='hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary/30'
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800 shadow-lg animate-slideDown'>
          <ul className='flex flex-col space-y-4 p-5 text-gray-700 dark:text-gray-300 font-medium'>
            <li>
              <Link
                href='/'
                className='block py-2 hover:text-primary transition'
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href='/products'
                className='block py-2 hover:text-primary transition'
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href='/checkout'
                className='block py-2 hover:text-primary transition'
              >
                Cesta
              </Link>
            </li>
            <li className='border-t dark:border-gray-800 pt-4 mt-2'>
              {session ? (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className='flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer'
                  >
                    <LogOut className='w-4 h-4' />
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  href='/auth/login'
                  className='block py-2 hover:text-primary transition'
                >
                  Iniciar sesion
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
