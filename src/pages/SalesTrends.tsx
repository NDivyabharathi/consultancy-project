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
import { TrendingUp, Calendar } from 'lucide-react';
import type { SalesTrendData } from '../types';
import { getJson } from '../lib/api';
import '../styles/modules.css';

export const SalesTrends: React.FC = () => {
  const [salesTrends, setSalesTrends] = useState<SalesTrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getJson<{ salesTrends: SalesTrendData[] }>('/sales-trends');
        setSalesTrends(Array.isArray(data.salesTrends) ? data.salesTrends : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sales trends');
        setSalesTrends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  const peakMonth = useMemo(() => {
    if (salesTrends.length === 0) {
      return { date: '-', revenue: 0 };
    }
    return salesTrends.reduce((max, curr) =>
      curr.revenue > max.revenue ? curr : max
    );
  }, [salesTrends]);

  const avgRevenue = useMemo(() => {
    if (salesTrends.length === 0) return 0;
    return salesTrends.reduce((sum, t) => sum + t.revenue, 0) / salesTrends.length;
  }, [salesTrends]);

  const trendPercentage = useMemo(() => {
    if (salesTrends.length < 2) return 0;
    const first = salesTrends[0].revenue;
    const last = salesTrends[salesTrends.length - 1].revenue;
    if (first === 0) return 0;
    return ((last - first) / first) * 100;
  }, [salesTrends]);

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Sales Trend Analysis</h1>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading sales trends...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : salesTrends.length === 0 ? (
        <div className="empty-state">
          <h3>No sales data yet</h3>
          <p>Sales trends will appear once orders are placed.</p>
        </div>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <span>Peak Sales Revenue</span>
              <p>₹{(peakMonth.revenue / 100000).toFixed(1)}L</p>
              <small>{peakMonth.date}</small>
            </div>
            <div className="summary-card">
              <span>Average Revenue</span>
              <p>₹{(avgRevenue / 100000).toFixed(1)}L</p>
            </div>
            <div className="summary-card">
              <span>Growth Trend</span>
              <p className="growth-positive">{trendPercentage.toFixed(1)}%</p>
              <small>Last 30 days</small>
            </div>
            <div className="summary-card">
              <span>Total Sales Orders</span>
              <p>{salesTrends.length}</p>
            </div>
          </div>

      {/* Trend Charts */}
          <div className="chart-container full-width">
            <h3>Revenue Trend Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                  formatter={(value: any) =>
                    `₹${value?.toLocaleString ? value.toLocaleString() : value}`
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Revenue (₹)"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container full-width">
            <h3>Sales Volume & Revenue</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  fill="#10b981"
                  name="Sales Orders"
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#f59e0b"
                  name="Revenue (₹)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

      {/* Insights */}
          <div className="insights-section">
            <h3>Trend Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <TrendingUp size={24} className="insight-icon" />
                <h4>Growth Trend</h4>
                <p>Sales revenue shows {trendPercentage.toFixed(1)}% trend over the month</p>
              </div>
              <div className="insight-card">
                <Calendar size={24} className="insight-icon" />
                <h4>Seasonal Pattern</h4>
                <p>Monitor demand changes by week to optimize production</p>
              </div>
              <div className="insight-card">
                <TrendingUp size={24} className="insight-icon" />
                <h4>Peak Performance</h4>
                <p>{peakMonth.date} shows the highest revenue in this period</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
