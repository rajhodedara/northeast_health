import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import OutbreakAlertManagement from './pages/outbreak-alert-management';
import DataSyncStatus from './pages/data-sync-status';
import DistrictOfficialsDashboard from './pages/district-officials-dashboard';
import InteractiveHealthMap from './pages/interactive-health-map';
import AshaDataCollection from './pages/asha-data-collection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AshaDataCollection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/outbreak-alert-management" element={<OutbreakAlertManagement />} />
        <Route path="/data-sync-status" element={<DataSyncStatus />} />
        <Route path="/district-officials-dashboard" element={<DistrictOfficialsDashboard />} />
        <Route path="/interactive-health-map" element={<InteractiveHealthMap />} />
        <Route path="/asha-data-collection" element={<AshaDataCollection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
