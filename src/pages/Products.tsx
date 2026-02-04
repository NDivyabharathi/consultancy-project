import React, { useEffect, useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { getJson, postJson } from '../lib/api';
import '../styles/modules.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const Products: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await getJson<{ products: Product[] }>('/products');
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const handleProductsUpdated = () => {
      fetchProducts();
    };

    window.addEventListener('products-updated', handleProductsUpdated);
    return () => {
      window.removeEventListener('products-updated', handleProductsUpdated);
    };
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.category === filter);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutError('');
    setCheckoutLoading(true);

    try {
      await Promise.all(
        cart.map((item) =>
          postJson('/orders', {
            productId: item.id,
            quantity: item.quantity,
            buyerId: user?.id,
          })
        )
      );
      setCart([]);
      fetchProducts();
      window.dispatchEvent(new Event('products-updated'));
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Browse Products</h1>
        <div className="cart-info">
          <ShoppingCart size={20} />
          <span>{cart.length} items - ₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="empty-state">
          <h3>Loading products...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>No products available</h3>
          <p>Ask admin to add products in Inventory.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h4>{product.name}</h4>
                <span className="category-badge">{product.category}</span>
              </div>
              <div className="product-info">
                <p>Available: {product.quantity} units</p>
                <p className="price">₹{product.price}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                <Plus size={18} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Shopping Cart</h3>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p className="cart-qty">Qty: {item.quantity}</p>
                </div>
                <p className="cart-price">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <span className="total-amount">₹{totalPrice.toLocaleString()}</span>
          </div>
          {checkoutError && (
            <p className="form-error" style={{ marginBottom: '12px' }}>
              {checkoutError}
            </p>
          )}
          <button
            className="btn btn-success"
            style={{ width: '100%' }}
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? 'Placing Order...' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};
