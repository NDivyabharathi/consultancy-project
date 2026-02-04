import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Plus, Trash2, AlertTriangle, X } from 'lucide-react';
import type { Product } from '../types';
import { deleteJson, getJson, postJson } from '../lib/api';
import '../styles/modules.css';

export const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'optimal'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    reorderLevel: '',
    price: '',
  });

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
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter === 'low-stock') return p.quantity <= p.reorderLevel;
    if (filter === 'optimal') return p.quantity > p.reorderLevel;
    return true;
  });

  const totalValue = filteredProducts.reduce(
    (sum, p) => sum + p.quantity * p.price,
    0
  );

  const totalValueLabel = useMemo(() => {
    if (totalValue <= 0) return '₹0';
    return totalValue >= 100000
      ? `₹${(totalValue / 100000).toFixed(1)}L`
      : `₹${totalValue.toLocaleString()}`;
  }, [totalValue]);

  const openAddModal = () => {
    setFormError('');
    setFormData({
      name: '',
      category: '',
      quantity: '',
      reorderLevel: '',
      price: '',
    });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormError('');
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError('');

    const quantity = Number(formData.quantity);
    const reorderLevel = Number(formData.reorderLevel);
    const price = Number(formData.price);

    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError('Name and category are required.');
      return;
    }

    if (Number.isNaN(quantity) || quantity < 0) {
      setFormError('Quantity must be 0 or greater.');
      return;
    }

    if (Number.isNaN(reorderLevel) || reorderLevel < 0) {
      setFormError('Reorder level must be 0 or greater.');
      return;
    }

    if (Number.isNaN(price) || price <= 0) {
      setFormError('Price must be greater than 0.');
      return;
    }

    try {
      setLoading(true);
      await postJson('/products', {
        name: formData.name.trim(),
        category: formData.category.trim(),
        quantity,
        reorderLevel,
        price,
      });
      await fetchProducts();
      window.dispatchEvent(new Event('products-updated'));
      setShowAddModal(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteJson(`/products/${id}`);
      await fetchProducts();
      window.dispatchEvent(new Event('products-updated'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Product & Inventory Management</h1>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {error && products.length > 0 && (
        <div className="empty-state" style={{ marginBottom: '20px' }}>
          <h3>{error}</h3>
        </div>
      )}

      <div className="summary-cards">
        <div className="summary-card">
          <span>Total Products</span>
          <p>{products.length}</p>
        </div>
        <div className="summary-card">
          <span>Total Value</span>
          <p>{totalValueLabel}</p>
        </div>
        <div className="summary-card">
          <span>Low Stock Items</span>
          <p>{products.filter((p) => p.quantity <= p.reorderLevel).length}</p>
        </div>
      </div>

      {/* Inventory Chart */}
      {products.length > 0 && (
        <div className="chart-container">
          <h3>Stock Levels by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#3b82f6" name="Current Stock" />
              <Bar dataKey="reorderLevel" fill="#ef4444" name="Reorder Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filter */}
      <div className="filter-section">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Products
        </button>
        <button
          className={`filter-btn ${filter === 'low-stock' ? 'active' : ''}`}
          onClick={() => setFilter('low-stock')}
        >
          Low Stock
        </button>
        <button
          className={`filter-btn ${filter === 'optimal' ? 'active' : ''}`}
          onClick={() => setFilter('optimal')}
        >
          Optimal Stock
        </button>
      </div>

      {/* Products Table */}
      {loading && products.length === 0 ? (
        <div className="empty-state">
          <h3>Loading products...</h3>
        </div>
      ) : error && products.length === 0 ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p>Click “Add Product” to create your first product.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.reorderLevel}</td>
                  <td>₹{product.price}</td>
                  <td>
                    {product.quantity <= product.reorderLevel ? (
                      <span className="status-badge status-critical">
                        <AlertTriangle size={14} />
                        Low Stock
                      </span>
                    ) : (
                      <span className="status-badge status-ok">Optimal</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="icon-btn delete"
                        title="Delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add Product</h3>
              <button className="icon-btn" onClick={closeAddModal}>
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, category: event.target.value }))
                  }
                  placeholder="e.g. Raw Materials"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, quantity: event.target.value }))
                    }
                    placeholder="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Reorder Level</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reorderLevel}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, reorderLevel: event.target.value }))
                    }
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, price: event.target.value }))
                  }
                  placeholder="0"
                  required
                />
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
