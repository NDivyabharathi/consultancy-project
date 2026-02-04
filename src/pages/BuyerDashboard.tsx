import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ShoppingCart, TrendingUp, Package, DollarSign } from 'lucide-react';
import type { Order, Product, SalesTrendData } from '../types';
import { useAuth } from '../context/AuthContext';
import { getJson } from '../lib/api';
import '../styles/dashboard.css';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [salesTrends, setSalesTrends] = useState<SalesTrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const [ordersRes, productsRes, trendsRes] = await Promise.all([
          getJson<{ orders: Order[] }>(`/orders?buyerId=${user?.id}`),
          getJson<{ products: Product[] }>('/products'),
          getJson<{ salesTrends: SalesTrendData[] }>('/sales-trends'),
        ]);
        
        setOrders(Array.isArray(ordersRes.orders) ? ordersRes.orders : []);
        setProducts(Array.isArray(productsRes.products) ? productsRes.products : []);
        setSalesTrends(Array.isArray(trendsRes.salesTrends) ? trendsRes.salesTrends : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === 'delivered').length,
    [orders]
  );
  const pendingOrders = useMemo(
    () => orders.filter((o) => ['pending', 'confirmed'].includes(o.status)).length,
    [orders]
  );
  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + o.totalPrice, 0),
    [orders]
  );
  const topProducts = useMemo(() => products.slice(0, 3), [products]);

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Buyer Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1>Buyer Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
          <p>{error}</p>
          <p>Make sure the backend server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Buyer Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#3b82f6' }}>
            <ShoppingCart size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Orders</p>
            <p className="kpi-value">{orders.length}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#10b981' }}>
            <TrendingUp size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Completed Orders</p>
            <p className="kpi-value">{completedOrders}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#f59e0b' }}>
            <Package size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Pending Orders</p>
            <p className="kpi-value">{pendingOrders}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#8b5cf6' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Spent</p>
            <p className="kpi-value">₹{(totalSpent / 100000).toFixed(1)}L</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Sales Trends */}
        <div className="chart-card">
          <h3>Market Sales Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                name="Market Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="chart-card">
          <h3>Available Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#10b981" name="Available Qty" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="orders-section">
        <h3>Your Recent Orders</h3>
        <div className="orders-table">
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#90ee90' }}>
              No orders yet. Start shopping in the Products section!
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>{order.id.substring(0, 8)}...</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.orderDate}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td>₹{order.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
