import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import type { PriceRecommendation as PriceRecommendationResult, Product } from '../types';
import { getJson } from '../lib/api';
import '../styles/modules.css';

interface PriceForm {
  productId: string;
  quantity: number;
  productionCost: number;
  season: 'normal' | 'festive';
}

export const PriceRecommendation: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PriceForm>({
    productId: '',
    quantity: 100,
    productionCost: 0,
    season: 'normal',
  });

  type RecommendationView = PriceRecommendationResult & {
    marginPercentage: string;
    reasoning: string[];
  };

  const [recommendation, setRecommendation] = useState<RecommendationView | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getJson<{ products: Product[] }>('/products');
        const list = Array.isArray(data.products) ? data.products : [];
        setProducts(list);
        if (list.length) {
          const first = list[0];
          setFormData((prev) => ({
            ...prev,
            productId: first.id,
            productionCost: first.price || 0,
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === formData.productId),
    [products, formData.productId]
  );

  const handleCalculate = () => {
    // Simulated ML model calculation
    const basePrice = formData.productionCost * 1.5;
    const seasonMultiplier = formData.season === 'festive' ? 1.25 : 1;
    const bulkDiscount = formData.quantity > 500 ? 0.95 : 1;
    const recommendedPrice = Math.round(basePrice * seasonMultiplier * bulkDiscount);

    setRecommendation({
      product: selectedProduct?.name ?? 'Unknown Product',
      quantity: formData.quantity,
      recommendedPrice,
      productionCost: formData.productionCost,
      margin: recommendedPrice - formData.productionCost,
      reason: 'Calculated using seasonal and bulk modifiers',
      marginPercentage: (
        ((recommendedPrice - formData.productionCost) / formData.productionCost) *
        100
      ).toFixed(2),
      reasoning: [
        `Production Cost: ₹${formData.productionCost}`,
        `Season: ${formData.season === 'festive' ? 'Festive (25% premium)' : 'Normal'}`,
        `Quantity: ${formData.quantity} units (${formData.quantity > 500 ? '5% bulk discount' : 'no bulk discount'})`,
        `Market Margin: 50%`,
      ],
    });
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Price Recommendation Module</h1>
        <button className="btn btn-primary" onClick={handleCalculate}>
          <Calculator size={20} />
          Calculate Price
        </button>
      </div>

      <div className="form-section">
        <h3>Price Calculation Inputs</h3>

        {loading ? (
          <div className="empty-state">
            <h3>Loading products...</h3>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>{error}</h3>
            <p>Make sure the backend server is running.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>No products available</h3>
            <p>Add products in Inventory to generate recommendations.</p>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <div className="form-group">
                <label>Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => {
                    const product = products.find((p) => p.id === e.target.value);
                    setFormData({
                      ...formData,
                      productId: e.target.value,
                      productionCost: product?.price ?? formData.productionCost,
                    });
                  }}
                  className="form-input"
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Order Quantity (units)</label>
                <input
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value) || 0,
                    })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Production Cost per Unit (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.productionCost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productionCost: Number(e.target.value) || 0,
                    })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Season</label>
                <select
                  value={formData.season}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      season: e.target.value as PriceForm['season'],
                    })
                  }
                  className="form-input"
                >
                  <option value="normal">Normal</option>
                  <option value="festive">Festive</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleCalculate}
              style={{ marginTop: '20px' }}
            >
              <RefreshCw size={20} />
              Generate Recommendation
            </button>
          </>
        )}
      </div>

      {recommendation && (
        <div className="recommendation-card">
          <h3>ML Recommendation</h3>
          <div className="recommendation-result">
            <div className="price-box">
              <p>Recommended Selling Price</p>
              <h2>₹{recommendation.recommendedPrice}</h2>
              <p className="sub-text">per unit</p>
            </div>

            <div className="metrics-grid">
              <div className="metric">
                <span>Production Cost</span>
                <p>₹{recommendation.productionCost}</p>
              </div>
              <div className="metric">
                <span>Profit Margin</span>
                <p>₹{recommendation.margin}</p>
              </div>
              <div className="metric">
                <span>Margin %</span>
                <p>{recommendation.marginPercentage}%</p>
              </div>
              <div className="metric">
                <span>Total Revenue</span>
                <p>
                  ₹
                  {(recommendation.recommendedPrice * recommendation.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="reasoning-section">
            <h4>Factors Considered:</h4>
            <ul>
              {recommendation.reasoning.map((reason: string, idx: number) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
