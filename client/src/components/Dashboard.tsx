import Admin from "./Admin";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div>
      {role === "admin" && (
        <div className="text-red-600">
          <Admin />
        </div>
      )}

      {role === "user" && (
        <div className="text-green-600">
          <UserDashboard />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
