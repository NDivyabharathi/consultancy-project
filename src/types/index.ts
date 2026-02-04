// User Types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'buyer';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  lastUpdated: string;
}

// Order Types
export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  totalPrice: number;
  buyerId: string;
}

// Forecast Types
export interface DemandForecast {
  product: string;
  week: string;
  predictedDemand: number;
  confidence: number;
}

// Inventory Alert Types
export interface InventoryAlert {
  productId: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  estimatedDepletion: string;
}

// Price Recommendation Types
export interface PriceRecommendation {
  product: string;
  quantity: number;
  recommendedPrice: number;
  productionCost: number;
  margin: number;
  reason: string;
}

// Analytics Types
export interface SalesTrendData {
  date: string;
  sales: number;
  revenue: number;
}

export interface WasteData {
  product: string;
  produced: number;
  sold: number;
  waste: number;
  percentage: number;
}