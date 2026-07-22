import { getCompanyProfile, getTeamMembers } from "@/lib/data";
import { CompanyManager } from "./CompanyManager";

export const metadata = {
  title: "Company Profile - Admin",
};

export default async function CompanyProfilePage() {
  const profile = await getCompanyProfile();
  const team = await getTeamMembers();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-admin-text tracking-tight">Company Profile</h1>
        <p className="text-admin-muted mt-2">Manage the CEO message and team members.</p>
      </div>

      <CompanyManager initialProfile={profile} initialTeam={team} />
    </div>
  );
}
