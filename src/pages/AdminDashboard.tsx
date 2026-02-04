import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  Package,
  DollarSign,
} from 'lucide-react';
import type { Product, InventoryAlert, WasteData, SalesTrendData } from '../types';
import { getJson } from '../lib/api';
import '../styles/dashboard.css';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const [salesTrends, setSalesTrends] = useState<SalesTrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const [productsRes, alertsRes, wasteRes, salesRes] = await Promise.all([
          getJson<{ products: Product[] }>('/products'),
          getJson<{ inventoryAlerts: InventoryAlert[] }>('/inventory-alerts'),
          getJson<{ wasteData: WasteData[] }>('/waste-analysis'),
          getJson<{ salesTrends: SalesTrendData[] }>('/sales-trends'),
        ]);
        
        setProducts(Array.isArray(productsRes.products) ? productsRes.products : []);
        setAlerts(Array.isArray(alertsRes.inventoryAlerts) ? alertsRes.inventoryAlerts : []);
        setWasteData(Array.isArray(wasteRes.wasteData) ? wasteRes.wasteData : []);
        setSalesTrends(Array.isArray(salesRes.salesTrends) ? salesRes.salesTrends : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = useMemo(() => products.length, [products]);
  const lowStockProducts = useMemo(
    () => products.filter((p) => p.quantity <= p.reorderLevel).length,
    [products]
  );
  const totalInventoryValue = useMemo(
    () => products.reduce((sum, p) => sum + p.quantity * p.price, 0),
    [products]
  );
  const totalSalesThisMonth = useMemo(
    () => salesTrends.reduce((sum, t) => sum + t.revenue, 0),
    [salesTrends]
  );

  const pieData = [
    { name: 'In Stock', value: totalProducts - lowStockProducts, fill: '#10b981' },
    { name: 'Low Stock', value: lowStockProducts, fill: '#ef4444' },
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
          <p>{error}</p>
          <p>Make sure the backend server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#3b82f6' }}>
            <Package size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Products</p>
            <p className="kpi-value">{totalProducts}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#ef4444' }}>
            <AlertCircle size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Low Stock Items</p>
            <p className="kpi-value">{lowStockProducts}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#10b981' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Inventory Value</p>
            <p className="kpi-value">₹{(totalInventoryValue / 100000).toFixed(1)}L</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ backgroundColor: '#f59e0b' }}>
            <TrendingUp size={24} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Monthly Sales</p>
            <p className="kpi-value">₹{(totalSalesThisMonth / 100000).toFixed(1)}L</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Sales Trends */}
        <div className="chart-card">
          <h3>Sales Trends (Last 30 Days)</h3>
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
                name="Revenue (₹)"
              />
              <Line type="monotone" dataKey="sales" stroke="#10b981" name="Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Status */}
        <div className="chart-card">
          <h3>Inventory Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Analysis */}
        <div className="chart-card full-width">
          <h3>Waste Analysis by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="produced" stackId="a" fill="#3b82f6" name="Produced" />
              <Bar dataKey="sold" stackId="a" fill="#10b981" name="Sold" />
              <Bar dataKey="waste" stackId="a" fill="#ef4444" name="Waste" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="alerts-section">
        <h3>Low Stock Alerts</h3>
        <div className="alerts-list">
          {alerts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#90ee90' }}>All products at optimal levels!</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert.productId} className="alert-item">
                <AlertCircle size={20} className="alert-icon" />
                <div className="alert-content">
                  <p className="alert-title">{alert.productName}</p>
                  <p className="alert-text">
                    Current: {alert.currentStock} units | Reorder Level: {alert.reorderLevel} units
                  </p>
                  <p className="alert-depletion">
                    Estimated depletion: {alert.estimatedDepletion}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
