import { getAnalyticsEvents } from "@/lib/data";
import { AnalyticsDashboardClient } from "@/components/admin/AnalyticsDashboardClient";

export default async function AnalyticsDashboard() {
  const events = await getAnalyticsEvents();

  return (
    <AnalyticsDashboardClient initialEvents={events} />
  );
}
