import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, CartItem } from './cart-store';

const mockItem: CartItem = {
  id: 'prod-1',
  name: 'Test Product',
  price: 29.99,
  imageUrl: 'https://example.com/image.jpg',
  quantity: 1
};

const mockItemWithSize: CartItem = {
  ...mockItem,
  size: 'M'
};

describe('CartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  describe('addOrIncreaseItem', () => {
    it('should add a new item to the cart', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual({ ...mockItem, quantity: 1 });
    });

    it('should increase quantity of existing item', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem(mockItem);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it('should treat same product with different size as separate items', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItemWithSize);
      addOrIncreaseItem({ ...mockItemWithSize, size: 'L' });

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(2);
    });

    it('should increase quantity for same product with same size', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItemWithSize);
      addOrIncreaseItem(mockItemWithSize);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it('should preserve item properties when adding', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);

      const { items } = useCartStore.getState();
      expect(items[0].name).toBe('Test Product');
      expect(items[0].price).toBe(29.99);
      expect(items[0].imageUrl).toBe('https://example.com/image.jpg');
    });

    it('should add multiple different products', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem({ ...mockItem, id: 'prod-2', name: 'Product 2' });

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(2);
      expect(items[0].name).toBe('Test Product');
      expect(items[1].name).toBe('Product 2');
    });
  });

  describe('decreaseQuantity', () => {
    it('should decrease quantity by 1', () => {
      const { addOrIncreaseItem, decreaseQuantity } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem(mockItem);
      decreaseQuantity('prod-1');

      const { items } = useCartStore.getState();
      expect(items[0].quantity).toBe(1);
    });

    it('should remove item when quantity reaches 0', () => {
      const { addOrIncreaseItem, decreaseQuantity } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      decreaseQuantity('prod-1');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });

    it('should only decrease the item with matching size', () => {
      const { addOrIncreaseItem, decreaseQuantity } = useCartStore.getState();
      addOrIncreaseItem(mockItemWithSize);
      addOrIncreaseItem({ ...mockItemWithSize, size: 'L' });
      decreaseQuantity('prod-1', 'M');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].size).toBe('L');
    });

    it('should not affect other items', () => {
      const { addOrIncreaseItem, decreaseQuantity } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem({ ...mockItem, id: 'prod-2' });
      decreaseQuantity('prod-1');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].id).toBe('prod-2');
    });
  });

  describe('removeItem', () => {
    it('should remove a specific item', () => {
      const { addOrIncreaseItem, removeItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      removeItem('prod-1');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });

    it('should only remove item with matching size', () => {
      const { addOrIncreaseItem, removeItem } = useCartStore.getState();
      addOrIncreaseItem(mockItemWithSize);
      addOrIncreaseItem({ ...mockItemWithSize, size: 'L' });
      removeItem('prod-1', 'M');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].size).toBe('L');
    });

    it('should not remove items with different id', () => {
      const { addOrIncreaseItem, removeItem } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem({ ...mockItem, id: 'prod-2' });
      removeItem('prod-999');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(2);
    });
  });

  describe('clearCart', () => {
    it('should remove all items', () => {
      const { addOrIncreaseItem, clearCart } = useCartStore.getState();
      addOrIncreaseItem(mockItem);
      addOrIncreaseItem({ ...mockItem, id: 'prod-2' });
      clearCart();

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });

    it('should work on empty cart', () => {
      const { clearCart } = useCartStore.getState();
      clearCart();

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle item with null imageUrl', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem({ ...mockItem, imageUrl: null });

      const { items } = useCartStore.getState();
      expect(items[0].imageUrl).toBeNull();
    });

    it('should handle price of 0', () => {
      const { addOrIncreaseItem } = useCartStore.getState();
      addOrIncreaseItem({ ...mockItem, price: 0 });

      const { items } = useCartStore.getState();
      expect(items[0].price).toBe(0);
    });
  });
});
