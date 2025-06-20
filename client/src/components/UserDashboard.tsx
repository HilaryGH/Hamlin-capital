// src/components/UserDashboard.tsx
import InvestorDashboard from "./InvestorDashboard";
import NotificationDisplay from "./NotificationDisplay";
import NotificationForm from "./NotificationForm";
import Register from "./Register";

import StartupUserDashboard from "./StartupUserDashboard";
import UserDash from "./userDash";

function UserDashboard() {
  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top User Overview */}
        <div className="bg-white rounded-xl shadow p-6">
          <UserDash />
        </div>
        <Register />

        {/* Grid Layout for Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InvestorDashboard />

          <StartupUserDashboard />

          {/* Register Form */}

          {/* Notification Subscription */}
          <div className="bg-white rounded-xl shadow p-6">
            <NotificationForm />
          </div>

          {/* Notification List */}
          <div className="bg-white rounded-xl shadow p-6">
            <NotificationDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
