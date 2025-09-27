import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import MenuAndOrdering from './pages/menu-and-ordering';
import LoginPage from './pages/login';
import TableReservation from './pages/table-reservation';
import OrderTracking from './pages/order-tracking';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/menu-and-ordering" element={<MenuAndOrdering />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/table-reservation" element={<TableReservation />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
