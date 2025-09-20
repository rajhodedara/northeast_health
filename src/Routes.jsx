import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import OutbreakAlertManagement from './pages/outbreak-alert-management';
import DataSyncStatus from './pages/data-sync-status';
import DistrictOfficialsDashboard from './pages/district-officials-dashboard';
import InteractiveHealthMap from './pages/interactive-health-map';
import AshaDataCollection from './pages/asha-data-collection';

// --- 1. IMPORT YOUR NEW PAGE ---
import ViewSubmittedDataPage from './pages/ViewSubmittedDataPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Redirect / to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/outbreak-alert-management" element={<OutbreakAlertManagement />} />
          <Route path="/data-sync-status" element={<DataSyncStatus />} />
          <Route path="/district-officials-dashboard" element={<DistrictOfficialsDashboard />} />
          <Route path="/interactive-health-map" element={<InteractiveHealthMap />} />
          <Route path="/asha-data-collection" element={<AshaDataCollection />} />
          
          {/* --- 2. ADD THE NEW ROUTE FOR YOUR DATA PAGE --- */}
          <Route path="/data-log" element={<ViewSubmittedDataPage />} />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;