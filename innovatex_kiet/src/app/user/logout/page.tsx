"use client"; // Add this at the top of the file

import React from 'react';
import LogoutButton from '@/components/logout-button';
import PrivateRoute from '@/components/privateRoute';

const LogoutPage: React.FC = () => {
  return (
    <PrivateRoute>
    <div className="flex flex-col items-center justify-center mt-56">
      <h1 className="text-3xl font-bold mb-6">Logout Page</h1>
      <LogoutButton />
    </div>
    </PrivateRoute>
  );
};

export default LogoutPage;