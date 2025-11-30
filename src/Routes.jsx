import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import AdminDashboard from './pages/admin-dashboard';
import CustomerRegistration from './pages/customer-registration';
import MenuAndFoodOrdering from './pages/menu-and-food-ordering';
import TableReservationSystem from './pages/table-reservation-system';
import OrderTrackingDashboard from './pages/order-tracking-dashboard';
import WaiterDashboard from './pages/waiter-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-registration" element={<CustomerRegistration />} />
        <Route path="/menu-and-food-ordering" element={<MenuAndFoodOrdering />} />
        <Route path="/table-reservation-system" element={<TableReservationSystem />} />
        <Route path="/order-tracking-dashboard" element={<OrderTrackingDashboard />} />
        <Route path="/waiter-dashboard" element={<WaiterDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
