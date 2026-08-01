import { describe, it, expect } from 'vitest';
import { formatCurrency } from './utils';

describe('formatCurrency', () => {
  it('should format amount in EUR by default', () => {
    const result = formatCurrency(29.99);
    expect(result).toMatch(/29[.,]99.*€/);
  });

  it('should format with custom currency', () => {
    const result = formatCurrency(100, 'USD', 'en-US');
    expect(result).toBe('$100.00');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/0[.,]00.*€/);
  });

  it('should handle large numbers', () => {
    const result = formatCurrency(1234567.89);
    expect(result).toMatch(/1[.,]234[.,]567[.,]89.*€/);
  });

  it('should always show 2 decimal places', () => {
    const result = formatCurrency(10);
    expect(result).toMatch(/10[.,]00.*€/);
  });
});
