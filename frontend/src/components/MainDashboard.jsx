import React from 'react';
import { useAuth } from '../contexts/SimpleAuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import SupervisorDashboard from './dashboards/SupervisorDashboard';
import UserDashboard from './dashboards/UserDashboard';

const MainDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'supervisor':
      return <SupervisorDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default MainDashboard;