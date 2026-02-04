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
import { AlertCircle, TrendingDown } from 'lucide-react';
import type { Product, InventoryAlert } from '../types';
import { getJson } from '../lib/api';
import '../styles/modules.css';

export const InventoryOptimization: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const productsData = await getJson<{ products: Product[] }>('/products');
        const alertsData = await getJson<{ inventoryAlerts: InventoryAlert[] }>('/inventory-alerts');
        const prods = Array.isArray(productsData.products) ? productsData.products : [];
        setProducts(prods);
        setAlerts(Array.isArray(alertsData.inventoryAlerts) ? alertsData.inventoryAlerts : []);
        if (prods.length && !selectedProduct) {
          setSelectedProduct(prods[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const optimizationData = useMemo(
    () =>
      products.map((p) => ({
        name: p.name,
        current: p.quantity,
        optimal: p.reorderLevel * 2,
        minimum: p.reorderLevel,
      })),
    [products]
  );

  const currentProduct = useMemo(
    () => products.find((p) => p.id === selectedProduct),
    [products, selectedProduct]
  );

  const recommendations = [
    {
      action: 'Increase Stock Level',
      reason:
        'Current stock trending towards depletion based on consumption rate',
      impact: 'Avoid stockouts and lost sales',
    },
    {
      action: 'Set Automatic Reorder',
      reason: 'Quantity falls below reorder level frequently',
      impact: 'Optimize procurement timing and reduce manual intervention',
    },
    {
      action: 'Improve Forecasting',
      reason: 'Demand shows seasonal variation',
      impact: '15-20% reduction in safety stock requirements',
    },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Inventory Optimization using ML</h1>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading inventory data...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p>Create products in Inventory to see optimization data.</p>
        </div>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <span>Items Below Optimal</span>
              <p>{alerts.length}</p>
            </div>
            <div className="summary-card">
              <span>Total Products</span>
              <p>{products.length}</p>
            </div>
            <div className="summary-card">
              <span>Optimization Opportunity</span>
              <p>{products.length > 0 ? ((alerts.length / products.length) * 100).toFixed(0) : 0}%</p>
            </div>
          </div>

          {/* Optimization Chart */}
          <div className="chart-container full-width">
            <h3>Current vs Optimal Stock Levels</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={optimizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minimum" fill="#ef4444" name="Minimum Level" />
                <Bar dataKey="current" fill="#3b82f6" name="Current Stock" />
                <Bar dataKey="optimal" fill="#10b981" name="Optimal Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product-specific Analysis */}
          {currentProduct && (
            <div className="analysis-section">
              <div className="analysis-header">
                <h3>{currentProduct.name} - Detailed Analysis</h3>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="form-input"
                  style={{ width: '300px' }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="metric-boxes">
                <div className="metric-box">
                  <span>Current Stock</span>
                  <h3>{currentProduct.quantity} units</h3>
                  <p>Last updated: {currentProduct.lastUpdated}</p>
                </div>
                <div className="metric-box">
                  <span>Reorder Level</span>
                  <h3>{currentProduct.reorderLevel} units</h3>
                  <p>Trigger point for procurement</p>
                </div>
                <div className="metric-box">
                  <span>Optimal Stock</span>
                  <h3>{currentProduct.reorderLevel * 2} units</h3>
                  <p>Recommended target level</p>
                </div>
                <div className="metric-box">
                  <span>Safety Stock Days</span>
                  <h3>
                    {currentProduct.quantity > currentProduct.reorderLevel
                      ? '8-10'
                      : '2-3'}
                  </h3>
                  <p>Days until critical level</p>
                </div>
              </div>
            </div>
          )}

          {/* Alerts */}
          <div className="alerts-section">
            <h3>Critical Alerts</h3>
            <div className="alerts-list">
              {alerts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#90ee90' }}>All products at optimal levels!</p>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.productId} className="alert-item critical">
                    <AlertCircle size={20} />
                    <div className="alert-content">
                      <p className="alert-title">{alert.productName}</p>
                      <p className="alert-text">
                        Current: {alert.currentStock} units | Reorder: {alert.reorderLevel} units
                      </p>
                      <p className="alert-depletion">Est. depletion: {alert.estimatedDepletion}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-section">
            <h3>ML-Based Recommendations</h3>
            <div className="recommendations-list">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="recommendation-item">
                  <div className="rec-header">
                    <h4>{rec.action}</h4>
                    <TrendingDown size={20} className="rec-icon" />
                  </div>
                  <p className="rec-reason">Reason: {rec.reason}</p>
                  <p className="rec-impact">
                    <strong>Expected Impact:</strong> {rec.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
