import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ add this
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import MainLayout from "./components/layouts/MainLayout";
import BareLayout from "./components/layouts/BareLayout";

// Layout Components

// Core Pages
import Home from "./components/Home";

import ContactPage from "./components/ContactPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import AdminDashboard from "./components/AdminDashboard";
import ThankYou from "./components/ThankYou";

// Informational Pages

import BrandValues from "./components/BrandValues";

// Service Pages
import HamlinServices from "./components/HamlinServices";

import MergersAcquisitionsPage from "./components/Service/MergersAcquisitionsPage";
import FundraisingPage from "./components/Service/FundraisingPage";
import AdvisoryPage from "./components/Service/AdvisoryPage";
import Research from "./components/Service/Research";
import ResearchPage from "./components/ResearchPage";

// Forms
import InvestorForm from "./components/InvestorForm";
import StartupForm from "./components/StartupForm";
import NotificationForm from "./components/NotificationForm";
import HelpPage from "./components/HelpPage";

// Membership & Listings
import MembershipPlans from "./components/MembershipPlans";
import BusinessFilter from "./components/Listings/BusinessFilter";
import PrivateEquityFilter from "./components/Listings/PrivateEquityFilter";
import RealEstateDealsFilter from "./components/Listings/RealEstateDealsFilter";
import VentureCapitalFilter from "./components/Listings/VentureCapitalFilter";
import DebtDealsFilter from "./components/Listings/DebtDealsFilter";

import Community from "./components/Community";
import DiasporaPage from "./components/DiasporaPage";

import Careers from "./components/Careers";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 🧱 Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<HamlinServices />} />
          <Route path="/service/fundraising" element={<FundraisingPage />} />
          <Route path="/service/ma" element={<MergersAcquisitionsPage />} />
          <Route path="/service/advisory" element={<AdvisoryPage />} />
          <Route path="/service/research" element={<Research />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/about/values" element={<BrandValues />} />
          <Route path="/help" element={<HelpPage />} />

          <Route path="/register/investor" element={<InvestorForm />} />
          <Route path="/register/startup" element={<StartupForm />} />
          <Route path="/notification" element={<NotificationForm />} />
          <Route path="/membership" element={<MembershipPlans />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route
            path="/listings/debt-deals/form"
            element={<DebtDealsFilter />}
          />
          <Route
            path="/listings/real-estate/form"
            element={<RealEstateDealsFilter />}
          />
          <Route
            path="/listings/private-equity/form"
            element={<PrivateEquityFilter />}
          />
          <Route
            path="/listings/business-for-sale/form"
            element={<BusinessFilter />}
          />
          <Route
            path="/listings/venture-capital/form"
            element={<VentureCapitalFilter />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* 🧼 Routes without Navbar and Footer */}
        <Route element={<BareLayout />}>
          <Route path="/diaspora" element={<DiasporaPage />} />
          <Route path="/community" element={<Community />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
