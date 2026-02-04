import React, { useEffect, useState } from 'react';
import { Plus, Eye, Download, X } from 'lucide-react';
import type { Order, Product } from '../types';
import { getJson, postJson } from '../lib/api';
import '../styles/modules.css';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '1',
    status: 'confirmed',
  });

  const fetchOrders = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await getJson<{ orders: Order[] }>('/orders');
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getJson<{ products: Product[] }>('/products');
      setProducts(Array.isArray(data.products) ? data.products : []);
      if (!formData.productId && data.products?.length) {
        setFormData((prev) => ({ ...prev, productId: data.products[0].id }));
      }
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const openModal = () => {
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleCreateOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError('');

    const quantity = Number(formData.quantity);
    if (!formData.productId) {
      setFormError('Please select a product.');
      return;
    }

    if (Number.isNaN(quantity) || quantity <= 0) {
      setFormError('Quantity must be greater than 0.');
      return;
    }

    try {
      setLoading(true);
      await postJson('/orders', {
        productId: formData.productId,
        quantity,
        status: formData.status,
      });
      await fetchOrders();
      window.dispatchEvent(new Event('products-updated'));
      setShowModal(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Order & Sales Management</h1>
        <button className="btn btn-primary" onClick={openModal}>
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <span>Total Orders</span>
          <p>{stats.total}</p>
        </div>
        <div className="summary-card">
          <span>Total Revenue</span>
          <p>₹{(totalRevenue / 100000).toFixed(1)}L</p>
        </div>
        <div className="summary-card">
          <span>Pending</span>
          <p>{stats.pending}</p>
        </div>
        <div className="summary-card">
          <span>Delivered</span>
          <p>{stats.delivered}</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="filter-section">
        {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(
          (status) => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      {loading && orders.length === 0 ? (
        <div className="empty-state">
          <h3>Loading orders...</h3>
        </div>
      ) : error && orders.length === 0 ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>Create your first order to see it here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td>₹{order.totalPrice.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="icon-btn" title="Download Invoice">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Create Order</h3>
              <button className="icon-btn" onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreateOrder}>
              <div className="form-group">
                <label>Product</label>
                <select
                  value={formData.productId}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, productId: event.target.value }))
                  }
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, quantity: event.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, status: event.target.value }))
                    }
                  >
                    {['pending', 'confirmed', 'shipped', 'delivered'].map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
