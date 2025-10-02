import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AssignmentTracking from './pages/assignment-tracking';
import Login from './pages/login';
import AcademicProgress from './pages/academic-progress';
import ParentDashboard from './pages/parent-dashboard';
import SchoolCalendar from './pages/school-calendar';
import MessagingCenter from './pages/messaging-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AcademicProgress />} />
        <Route path="/assignment-tracking" element={<AssignmentTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/academic-progress" element={<AcademicProgress />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/school-calendar" element={<SchoolCalendar />} />
        <Route path="/messaging-center" element={<MessagingCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
