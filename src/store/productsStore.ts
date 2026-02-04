import type { Product } from '../types';

const STORAGE_KEY = 'products';

const readProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('products-updated'));
};

export const getProducts = (): Product[] => readProducts();

export const addProduct = (product: Omit<Product, 'id' | 'lastUpdated'>) => {
  const products = readProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    lastUpdated: new Date().toISOString().slice(0, 10),
  };
  const updated = [newProduct, ...products];
  writeProducts(updated);
  return updated;
};

export const updateProduct = (id: string, updates: Partial<Omit<Product, 'id'>>) => {
  const products = readProducts();
  const updated = products.map((p) =>
    p.id === id
      ? { ...p, ...updates, lastUpdated: new Date().toISOString().slice(0, 10) }
      : p
  );
  writeProducts(updated);
  return updated;
};

export const deleteProduct = (id: string) => {
  const products = readProducts();
  const updated = products.filter((p) => p.id !== id);
  writeProducts(updated);
  return updated;
};