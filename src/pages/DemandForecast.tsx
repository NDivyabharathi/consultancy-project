import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Upload } from 'lucide-react';
import type { DemandForecast } from '../types';
import { getJson } from '../lib/api';
import '../styles/modules.css';

export const DemandForecast: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [forecasts, setForecasts] = useState<DemandForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecasts = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getJson<{ forecasts: DemandForecast[] }>('/demand-forecasts');
        const items = Array.isArray(data.forecasts) ? data.forecasts : [];
        setForecasts(items);
        if (items.length && !selectedProduct) {
          setSelectedProduct(items[0].product);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load forecasts');
        setForecasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchForecasts();
  }, [selectedProduct]);

  const allProducts = useMemo(
    () => Array.from(new Set(forecasts.map((f) => f.product))),
    [forecasts]
  );

  const forecastData = forecasts.filter((f) => f.product === selectedProduct);

  const productStats = forecastData.reduce(
    (acc, f) => {
      acc.totalDemand += f.predictedDemand;
      acc.avgConfidence = (acc.avgConfidence + f.confidence) / 2;
      return acc;
    },
    { totalDemand: 0, avgConfidence: 0 }
  );

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Demand Forecasting & Production Planning</h1>
        <button className="btn btn-primary">
          <Upload size={20} />
          Upload Data
        </button>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading forecasts...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
          <p>Make sure the backend server is running.</p>
        </div>
      ) : forecasts.length === 0 ? (
        <div className="empty-state">
          <h3>No forecast data yet</h3>
          <p>Forecasts are generated from order history.</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="summary-cards">
            <div className="summary-card">
              <span>3-Week Forecast</span>
              <p>{productStats.totalDemand} units</p>
            </div>
            <div className="summary-card">
              <span>Confidence Level</span>
              <p>{(productStats.avgConfidence * 100).toFixed(1)}%</p>
            </div>
            <div className="summary-card">
              <span>Avg Weekly Demand</span>
              <p>{Math.round(productStats.totalDemand / 3)} units</p>
            </div>
          </div>

          {/* Product Selection */}
          <div className="control-section">
            <label>Select Product:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="form-input"
            >
              {allProducts.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* Forecast Chart */}
          <div className="chart-container">
            <h3>Demand Forecast - {selectedProduct}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predictedDemand"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Predicted Demand (units)"
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Confidence %"
                  yAxisId="right"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Table */}
          <div className="table-container">
            <h3>Forecast Details</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Predicted Demand</th>
                  <th>Confidence</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((forecast) => (
                  <tr key={forecast.week}>
                    <td>{forecast.week}</td>
                    <td>{forecast.predictedDemand} units</td>
                    <td>
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${forecast.confidence * 100}%` }}
                        />
                      </div>
                      {(forecast.confidence * 100).toFixed(1)}%
                    </td>
                    <td>
                      Produce {Math.round(forecast.predictedDemand * 1.1)} units
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
