'use client';

import { useCartStore } from '@/store/cart-store';
import { useSession, signOut } from '@/lib/auth-client';
import { Menu, ShoppingCartIcon, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

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
    <nav className='sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-md'>
      <div className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-extrabold text-gray-900 dark:text-white hover:text-primary transition'
        >
          My<span className='text-primary'>Ecommerce</span>
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
            className='relative flex flex-col items-center hover:scale-105 transition'
          >
            <div className='relative'>
              <ShoppingCartIcon className='w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition' />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shadow'>
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className='flex items-center space-x-3'>
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Auth */}
          {session ? (
            <div className='flex items-center space-x-3'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className='flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition'
              >
                <LogOut className='w-4 h-4' />
                <span className='text-sm'>Salir</span>
              </button>
            </div>
          ) : (
            <Link
              href='/auth/login'
              className='text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium'
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
