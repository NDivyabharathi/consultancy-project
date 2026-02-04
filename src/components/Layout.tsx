import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertCircle,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import '../styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products & Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Orders & Sales', path: '/orders' },
    { icon: TrendingUp, label: 'Demand Forecast', path: '/forecast' },
    { icon: DollarSign, label: 'Price Recommendation', path: '/pricing' },
    { icon: BarChart3, label: 'Sales Trends', path: '/trends' },
    { icon: AlertCircle, label: 'Inventory Optimization', path: '/optimization' },
    { icon: BarChart3, label: 'Waste Analysis', path: '/waste' },
    { icon: MessageSquare, label: 'Analytics Reports', path: '/reports' },
    { icon: Settings, label: 'Admin Control', path: '/admin' },
  ];

  const buyerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingCart, label: 'Browse Products', path: '/products' },
    { icon: ShoppingCart, label: 'My Orders', path: '/my-orders' },
    { icon: DollarSign, label: 'Price Info', path: '/price-info' },
    { icon: MessageSquare, label: 'Support Chat', path: '/chat' },
  ];

  const menuItems = isAdmin ? adminMenuItems : buyerMenuItems;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>IntelliTextile</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-item"
              title={item.label}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="header-right">
            <div className="user-info">
              <Users size={20} />
              <div>
                <p className="user-name">{user?.name}</p>
                <p className="user-role">{user?.role?.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};
