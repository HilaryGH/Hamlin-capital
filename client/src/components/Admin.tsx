import AdminDashboard from "./AdminDashboard";
import AdminDealForm from "./AdminDealForm";
import AdminInterests from "./AdminInterests";
import AdminListingForm from "./AdminListingForm";
import AdminMessages from "./AdminMessages";
import AppliedJobs from "./AppliedJobs";
import CareerAdminDashboard from "./CareerAdminDashboard";
import MembershipAdmin from "./MembershipAdmin";
import StartupAdminDashboard from "./StartupAdminDashboard";
import Section from "./Section"; // Make sure you import this if not already

function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Admin Panel
      </h1>

      <div className="space-y-10">
        <Section title="📊 Investors">
          <AdminDashboard />
        </Section>

        <Section title="🚀 Startups">
          <StartupAdminDashboard />
        </Section>

        <Section title="👥 Memberships">
          <MembershipAdmin />
        </Section>

        <Section title="📃 Listings">
          <AdminListingForm />
        </Section>

        <Section title="💼 Deal Form">
          <AdminDealForm />
        </Section>

        <Section title="⭐ Investor Interests">
          <AdminInterests />
        </Section>

        <Section title="🎓 Career Dashboard">
          <CareerAdminDashboard />
        </Section>

        <Section title="📥 Applied Jobs">
          <AppliedJobs />
        </Section>

        <Section title="📬 Contact Messages">
          <AdminMessages />
        </Section>
      </div>
    </div>
  );
}

export default Admin;
