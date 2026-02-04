import type { Product, Order, DemandForecast, SalesTrendData, InventoryAlert } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cotton Fabric - Grey',
    category: 'Raw Materials',
    quantity: 450,
    reorderLevel: 200,
    price: 150,
    lastUpdated: '2026-02-01',
  },
  {
    id: '2',
    name: 'Denim Cloth',
    category: 'Finished Goods',
    quantity: 320,
    reorderLevel: 150,
    price: 280,
    lastUpdated: '2026-02-01',
  },
  {
    id: '3',
    name: 'Polyester Thread',
    category: 'Raw Materials',
    quantity: 1200,
    reorderLevel: 500,
    price: 25,
    lastUpdated: '2026-02-01',
  },
  {
    id: '4',
    name: 'Cotton Leggings',
    category: 'Finished Goods',
    quantity: 180,
    reorderLevel: 100,
    price: 220,
    lastUpdated: '2026-02-01',
  },
  {
    id: '5',
    name: 'Silk Blend Fabric',
    category: 'Raw Materials',
    quantity: 280,
    reorderLevel: 150,
    price: 450,
    lastUpdated: '2026-02-01',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    productId: '1',
    productName: 'Cotton Fabric - Grey',
    quantity: 100,
    orderDate: '2026-01-28',
    status: 'delivered',
    totalPrice: 15000,
    buyerId: 'buyer-001',
  },
  {
    id: 'ORD-002',
    productId: '2',
    productName: 'Denim Cloth',
    quantity: 50,
    orderDate: '2026-01-30',
    status: 'shipped',
    totalPrice: 14000,
    buyerId: 'buyer-001',
  },
  {
    id: 'ORD-003',
    productId: '4',
    productName: 'Cotton Leggings',
    quantity: 200,
    orderDate: '2026-02-01',
    status: 'confirmed',
    totalPrice: 44000,
    buyerId: 'buyer-001',
  },
];

export const mockDemandForecasts: DemandForecast[] = [
  { product: 'Cotton Fabric - Grey', week: 'Week 1', predictedDemand: 450, confidence: 0.92 },
  { product: 'Cotton Fabric - Grey', week: 'Week 2', predictedDemand: 520, confidence: 0.88 },
  { product: 'Cotton Fabric - Grey', week: 'Week 3', predictedDemand: 480, confidence: 0.85 },
  { product: 'Denim Cloth', week: 'Week 1', predictedDemand: 320, confidence: 0.91 },
  { product: 'Denim Cloth', week: 'Week 2', predictedDemand: 380, confidence: 0.89 },
  { product: 'Denim Cloth', week: 'Week 3', predictedDemand: 420, confidence: 0.87 },
];

export const mockSalesTrends: SalesTrendData[] = [
  { date: 'Jan 1', sales: 12, revenue: 180000 },
  { date: 'Jan 8', sales: 15, revenue: 225000 },
  { date: 'Jan 15', sales: 18, revenue: 270000 },
  { date: 'Jan 22', sales: 22, revenue: 330000 },
  { date: 'Jan 29', sales: 25, revenue: 375000 },
  { date: 'Feb 1', sales: 28, revenue: 420000 },
];

export const mockInventoryAlerts: InventoryAlert[] = [
  {
    productId: '4',
    productName: 'Cotton Leggings',
    currentStock: 180,
    reorderLevel: 100,
    estimatedDepletion: '5 days',
  },
  {
    productId: '2',
    productName: 'Denim Cloth',
    currentStock: 320,
    reorderLevel: 150,
    estimatedDepletion: '8 days',
  },
];

export const mockWasteData = [
  { product: 'Cotton Fabric - Grey', produced: 1500, sold: 1200, waste: 300, percentage: 20 },
  { product: 'Denim Cloth', produced: 800, sold: 750, waste: 50, percentage: 6.25 },
  { product: 'Cotton Leggings', produced: 600, sold: 580, waste: 20, percentage: 3.33 },
];
