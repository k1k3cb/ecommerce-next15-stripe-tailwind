'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col items-center justify-center text-center py-16 px-4'
    >
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: [10, -10, 10] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className='w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6'
      >
        {icon}
      </motion.div>

      <h2 className='text-2xl font-bold mb-2'>{title}</h2>
      <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md'>
        {description}
      </p>

      {action && (
        <Link href={action.href}>
          <Button size='lg' className='px-6 py-3 text-lg cursor-pointer'>
            {action.label}
          </Button>
        </Link>
      )}
    </motion.div>
  );
}
