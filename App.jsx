import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ================= THEME & LAYOUT =================
import { ThemeProvider } from './components/ui/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import DealershipDashboard from './src/app/(dashboard)/DealershipDashboard';

// ================= PAGES (Imports would go here) =================

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            
            {/* 🌐 PUBLIC ROUTES */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> */}

            {/* 🔒 PROTECTED ROUTES (Requires Login, Has Sidebar/Navbar) */}
            <Route element={<ProtectedLayout />}>
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/overview" replace />} />
              
              {/* Dashboard / Core */}
              <Route path="/overview" element={<DealershipDashboard />} />
              {/* <Route path="/control" element={<AccessControl />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<MyProfile />} /> */}

              {/* Dealership Inventory */}
              <Route path="/inventory" element={<InventoryDashboard />} />
              <Route path="/inventory/add" element={<AddVehicle />} />
              <Route path="/inventory/:vin" element={<VehicleDetails />} />
              <Route path="/inventory/:vin/edit" element={<EditVehicle />} />
              <Route path="/inventory/:vin/gallery" element={<VehicleGallery />} />

              {/* Customers & Deals */}
              {/* <Route path="/customers" element={<CustomersDashboard />} />
              <Route path="/customers/add" element={<AddCustomer />} />
              <Route path="/customers/:id" element={<CustomerProfile />} />
              <Route path="/customers/:id/payments" element={<CustomerPayments />} />
              <Route path="/customers/:id/returns" element={<ProcessReturn />} />
              <Route path="/deals/pending" element={<PendingDeals />} /> */}

              {/* Financials & Operating Costs */}
              {/* <Route path="/finance" element={<FinanceDashboard />} />
              <Route path="/finance/expenses" element={<OperatingCosts />} />
              <Route path="/finance/invoices" element={<Invoices />} />
              <Route path="/reports" element={<FinancialReports />} /> */}

              {/* Company Fleet Management */}
              {/* <Route path="/fleet" element={<FleetDashboard />} />
              <Route path="/fleet/add" element={<AddCompanyVehicle />} />
              <Route path="/fleet/checkout" element={<VehicleCheckoutLog />} />
              <Route path="/fleet/maintenance" element={<MaintenanceLog />} /> */}

              {/* Staff & Permissions */}
              {/* <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/permissions" element={<UserPermissions />} />
              <Route path="/audit" element={<AuditDashboard />} /> */}

            </Route>

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}