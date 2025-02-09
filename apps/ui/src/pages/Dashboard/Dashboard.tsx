import { useAuthContext } from '@/app/authProvider';
import { api } from '@/shared/api/api';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Dashboard: React.FC = () => {
  const dummyData = {
    totalSales: '$15,234',
    activeUsers: 1234,
    pendingOrders: 45,
    revenue: '$45,678',
  };

  const { setValue, value } = useAuthContext();
  const navigage = useNavigate();

  useEffect(() => {
    (async () => {
      const tokenId = localStorage.getItem('token');
      if (!tokenId) {
        await navigage('/login');
        return;
      }

      const token = await api.getToken({ params: { id: tokenId } });

      if (!token) {
        await navigage('/login');
        return;
      }
      setValue(token);
    })();
  }, []);

  return (
    <div className="p-6">
      {value?.token}
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="mt-2 text-2xl font-semibold text-indigo-600">
            {dummyData.totalSales}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="mt-2 text-2xl font-semibold text-indigo-600">
            {dummyData.activeUsers}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
          <p className="mt-2 text-2xl font-semibold text-indigo-600">
            {dummyData.pendingOrders}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="mt-2 text-2xl font-semibold text-indigo-600">
            {dummyData.revenue}
          </p>
        </div>
      </div>
    </div>
  );
};
