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
import ProtectedRoute from "./Pages/MainPages/ProtectedRoute";
import RegisterPage from "./Pages/MainPages/RegisterPage";
import LandingPage from "./Pages/MainPages/LandingPage";
import LoginPage from "./Pages/MainPages/LoginPage";
import ResetPassword from "./Pages/MainPages/ResetPassword";
import ForgetPassword from "./Pages/MainPages/ForgetPassword";
import { Toaster } from "react-hot-toast";
// import GuestRoute from "./Pages/MainPages/GuestRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/login" element={<LoginPage />} />
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
            <Route path="cases" element={<CasesPage />} />
            <Route path="hearing" element={<HearingsPage />} />
            <Route path="document" element={<DocumentsPage />} />
            <Route path="lawyer" element={<LawyersPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="report" element={<ReportsPage />} />
            <Route path="setting" element={<SettingsPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}
