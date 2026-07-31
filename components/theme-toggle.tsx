'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='w-9 h-9'>
        <div className='w-5 h-5' />
      </Button>
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative w-9 h-9 cursor-pointer'
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.div
            key='moon'
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className='w-5 h-5' />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className='w-5 h-5' />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
