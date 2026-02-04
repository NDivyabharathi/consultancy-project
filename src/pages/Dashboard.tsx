import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import BuyerDashboard from './BuyerDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return user?.role === 'admin' ? <AdminDashboard /> : <BuyerDashboard />;
};
