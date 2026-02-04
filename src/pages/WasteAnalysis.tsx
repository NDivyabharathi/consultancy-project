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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import type { WasteData } from '../types';
import { getJson } from '../lib/api';
import '../styles/modules.css';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16'];


export const WasteAnalysis: React.FC = () => {
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getJson<{ wasteData: WasteData[] }>('/waste-analysis');
        setWasteData(Array.isArray(data.wasteData) ? data.wasteData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load waste analysis');
        setWasteData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWaste();
  }, []);

  const totalProduced = useMemo(
    () => wasteData.reduce((sum, w) => sum + w.produced, 0),
    [wasteData]
  );
  const totalWaste = useMemo(
    () => wasteData.reduce((sum, w) => sum + w.waste, 0),
    [wasteData]
  );
  const avgWastePercentage = useMemo(() => {
    if (wasteData.length === 0) return 0;
    return wasteData.reduce((sum, w) => sum + w.percentage, 0) / wasteData.length;
  }, [wasteData]);

  const pieData = wasteData.map((w) => ({
    name: w.product,
    value: w.waste,
  }));

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Waste Analysis & Optimization</h1>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading waste analysis...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : wasteData.length === 0 ? (
        <div className="empty-state">
          <h3>No waste data yet</h3>
          <p>Waste analysis will populate as production and sales data grow.</p>
        </div>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <span>Total Produced</span>
              <p>{totalProduced.toLocaleString()} units</p>
            </div>
            <div className="summary-card">
              <span>Total Waste</span>
              <p>{totalWaste.toLocaleString()} units</p>
            </div>
            <div className="summary-card">
              <span>Waste Rate</span>
              <p className="waste-alert">{avgWastePercentage.toFixed(2)}%</p>
            </div>
            <div className="summary-card">
              <span>Potential Savings</span>
              <p>₹{(totalWaste * 150).toLocaleString()}</p>
              <small>At ₹150 per unit</small>
            </div>
          </div>

          {/* Waste by Product */}
          <div className="chart-container full-width">
            <h3>Production vs Waste Analysis</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="produced" fill="#3b82f6" name="Produced" />
                <Bar dataKey="sold" fill="#10b981" name="Sold" />
                <Bar dataKey="waste" fill="#ef4444" name="Waste" />
              </BarChart>
            </ResponsiveContainer>
          </div>

      {/* Waste Distribution Pie Chart */}
      <div className="chart-container">
        <h3>Waste Distribution by Product</h3>
        <ResponsiveContainer width="100%" height={350}>
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
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table */}
      <div className="table-container">
        <h3>Waste Details by Product</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Produced</th>
              <th>Sold</th>
              <th>Waste Units</th>
              <th>Waste %</th>
              <th>Loss (₹)</th>
            </tr>
          </thead>
          <tbody>
            {wasteData.map((data, idx) => (
              <tr key={idx} className={data.percentage > 10 ? 'critical' : ''}>
                <td>{data.product}</td>
                <td>{data.produced}</td>
                <td>{data.sold}</td>
                <td>{data.waste}</td>
                <td>
                  <span
                    className={
                      data.percentage > 10 ? 'waste-high' : 'waste-low'
                    }
                  >
                    {data.percentage.toFixed(2)}%
                  </span>
                </td>
                <td>₹{(data.waste * 150).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h3>Waste Reduction Recommendations</h3>
        <div className="recommendations-list">
          <div className="recommendation-item">
            <div className="rec-header">
              <h4>Improve Demand Forecasting</h4>
              <AlertTriangle size={20} />
            </div>
            <p className="rec-reason">
              Better demand prediction reduces overproduction
            </p>
            <p className="rec-impact">
              <strong>Potential Savings:</strong> ₹{(totalWaste * 0.4 * 150).toLocaleString()}
            </p>
          </div>
          <div className="recommendation-item">
            <div className="rec-header">
              <h4>Optimize Batch Sizes</h4>
              <TrendingDown size={20} />
            </div>
            <p className="rec-reason">Align production batches with actual orders</p>
            <p className="rec-impact">
              <strong>Potential Savings:</strong> ₹{(totalWaste * 0.3 * 150).toLocaleString()}
            </p>
          </div>
          <div className="recommendation-item">
            <div className="rec-header">
              <h4>Quality Control Enhancement</h4>
              <AlertTriangle size={20} />
            </div>
            <p className="rec-reason">Reduce defective units in production</p>
            <p className="rec-impact">
              <strong>Potential Savings:</strong> ₹{(totalWaste * 0.3 * 150).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
