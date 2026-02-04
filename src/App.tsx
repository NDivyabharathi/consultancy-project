import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import Index from './pages/Index';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Orders } from './pages/Orders';
import { DemandForecast } from './pages/DemandForecast';
import { PriceRecommendation } from './pages/PriceRecommendation';
import { SalesTrends } from './pages/SalesTrends';
import { InventoryOptimization } from './pages/InventoryOptimization';
import { WasteAnalysis } from './pages/WasteAnalysis';
import { Products } from './pages/Products';
import { SupportChat } from './pages/SupportChat';
import { AdminControl } from './pages/AdminControl';
import Try from './try/try';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Try />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Inventory />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Orders />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecast"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <DemandForecast />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <PriceRecommendation />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <SalesTrends />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/optimization"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <InventoryOptimization />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/waste"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <WasteAnalysis />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminControl />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredRole="buyer">
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute requiredRole="buyer">
                <Layout>
                  <Orders />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute requiredRole="buyer">
                <Layout>
                  <SupportChat />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
