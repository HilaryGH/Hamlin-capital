// InvestorDashboardLayout.tsx
import { Outlet, Link } from "react-router-dom";

export default function InvestorDashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-xl mb-4">Investor Panel</h2>
        <nav className="space-y-2">
          <Link to="overview">Overview</Link>
          <Link to="profile">Profile</Link>
          <Link to="documents">Documents</Link>
          <Link to="status">Status</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
