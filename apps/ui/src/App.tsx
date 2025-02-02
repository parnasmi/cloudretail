import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { NavLink } from './shared/ui/NavLink/NavLink';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <span className="text-xl font-semibold text-indigo-600">
                  CloudRetail
                </span>
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/">Dashboard</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
