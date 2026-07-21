import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Content/DashboardPage";
import AdminLayout from "./Pages/Content/AdminLayout";
import ClientsPage from "./Pages/Content/ClientsPage";
import CasesPage from "./Pages/Content/CasesPage";
import HearingsPage from "./Pages/Content/HearingsPage";
import DocumentsPage from "./Pages/Content/DocumentsPage";
import LawyersPage from "./Pages/Content/LawyersPage ";
import BillingPage from "./Pages/Content/BillingPage";
import ReportsPage from "./Pages/Content/ReportsPage";
import SettingsPage from "./Pages/Content/SettingsPage";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="client" element={<ClientsPage />} />
            <Route path="Cases" element={<CasesPage />} />
            <Route path="Hearing" element={<HearingsPage />} />
            <Route path="Document" element={<DocumentsPage />} />
            <Route path="Lawyer" element={<LawyersPage />} />
            <Route path="Billing" element={<BillingPage />} />
            <Route path="Report" element={<ReportsPage />} />
            <Route path="Setting" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
