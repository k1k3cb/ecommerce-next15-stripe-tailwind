'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

export interface FilterConfig {
  brand: string[];
  colorway: string[];
  gender: string[];
  release_type: string[];
  material: string[];
  silhouette: string[];
  priceRange: { min: number; max: number };
}

export type ActiveFilters = {
  brands: string[];
  colorways: string[];
  genders: string[];
  releaseTypes: string[];
  materials: string[];
  silhouettes: string[];
  priceMin: number | null;
  priceMax: number | null;
};

const defaultActive: ActiveFilters = {
  brands: [],
  colorways: [],
  genders: [],
  releaseTypes: [],
  materials: [],
  silhouettes: [],
  priceMin: null,
  priceMax: null,
};

const filterLabels: Record<keyof Omit<ActiveFilters, 'priceMin' | 'priceMax'>, string> = {
  brands: 'Marca',
  colorways: 'Color',
  genders: 'Género',
  releaseTypes: 'Tipo de lanzamiento',
  materials: 'Material',
  silhouettes: 'Silueta',
};

const filterKeys: Record<keyof Omit<ActiveFilters, 'priceMin' | 'priceMax'>, keyof Omit<FilterConfig, 'priceRange'>> = {
  brands: 'brand',
  colorways: 'colorway',
  genders: 'gender',
  releaseTypes: 'release_type',
  materials: 'material',
  silhouettes: 'silhouette',
};

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(true);

  if (options.length === 0) return null;

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold uppercase tracking-wider cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {selected.length}
            </span>
          )}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-3">
              {options.map(option => {
                const isActive = selected.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => onToggle(option)}
                    className={
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ' +
                      (isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500')
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductFiltersProps {
  config: FilterConfig;
  active: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

const ProductFilters = ({ config, active, onChange }: ProductFiltersProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalActive =
    active.brands.length +
    active.colorways.length +
    active.genders.length +
    active.releaseTypes.length +
    active.materials.length +
    active.silhouettes.length +
    (active.priceMin !== null ? 1 : 0) +
    (active.priceMax !== null ? 1 : 0);

  const toggleFilter = (key: keyof Omit<ActiveFilters, 'priceMin' | 'priceMax'>, value: string) => {
    const current = active[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...active, [key]: updated });
  };

  const clearAll = () => {
    onChange(defaultActive);
  };

  const setPrice = (field: 'priceMin' | 'priceMax', value: string) => {
    const num = value === '' ? null : Number(value);
    onChange({ ...active, [field]: num });
  };

  const filterContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest">Filtros</h3>
        {totalActive > 0 && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline cursor-pointer">
            Limpiar todo ({totalActive})
          </button>
        )}
      </div>

      {(Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map(key => (
        <FilterSection
          key={key}
          title={filterLabels[key]}
          options={config[filterKeys[key]]}
          selected={active[key]}
          onToggle={value => toggleFilter(key, value)}
        />
      ))}

      {config.priceRange.max > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <p className="py-2 text-sm font-semibold uppercase tracking-wider">Precio</p>
          <div className="flex items-center gap-2 pt-3">
            <input
              type="number"
              min={config.priceRange.min}
              max={config.priceRange.max}
              placeholder={'Min EUR' + config.priceRange.min}
              value={active.priceMin ?? ''}
              onChange={e => setPrice('priceMin', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min={config.priceRange.min}
              max={config.priceRange.max}
              placeholder={'Max EUR' + config.priceRange.max}
              value={active.priceMax ?? ''}
              onChange={e => setPrice('priceMax', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      )}

      {totalActive > 0 && (
        <div className="pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Activos</p>
          <div className="flex flex-wrap gap-1.5">
            {active.brands.map(v => (
              <ActiveChip key={'b-' + v} label={v} onRemove={() => toggleFilter('brands', v)} />
            ))}
            {active.colorways.map(v => (
              <ActiveChip key={'c-' + v} label={v} onRemove={() => toggleFilter('colorways', v)} />
            ))}
            {active.genders.map(v => (
              <ActiveChip key={'g-' + v} label={v} onRemove={() => toggleFilter('genders', v)} />
            ))}
            {active.releaseTypes.map(v => (
              <ActiveChip key={'r-' + v} label={v} onRemove={() => toggleFilter('releaseTypes', v)} />
            ))}
            {active.materials.map(v => (
              <ActiveChip key={'m-' + v} label={v} onRemove={() => toggleFilter('materials', v)} />
            ))}
            {active.silhouettes.map(v => (
              <ActiveChip key={'s-' + v} label={v} onRemove={() => toggleFilter('silhouettes', v)} />
            ))}
            {(active.priceMin !== null || active.priceMax !== null) && (
              <ActiveChip
                label={'EUR' + (active.priceMin ?? 0) + '-' + (active.priceMax ?? 'inf')}
                onRemove={() => onChange({ ...active, priceMin: null, priceMax: null })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 w-full justify-center cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Filtros
          {totalActive > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {totalActive}
            </span>
          )}
        </Button>
      </div>

      <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 pb-8">
        {filterContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-950 z-50 p-6 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Cerrar filtros"
                >
                  <X size={20} />
                </button>
              </div>
              {filterContent}
              <div className="sticky bottom-0 pt-4 pb-2 bg-white dark:bg-gray-950">
                <Button onClick={() => setMobileOpen(false)} className="w-full cursor-pointer">
                  Ver resultados
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-primary/70 cursor-pointer" aria-label={'Quitar filtro ' + label}>
        <X size={12} />
      </button>
    </span>
  );
}

export default ProductFilters;
