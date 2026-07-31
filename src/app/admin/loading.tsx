import { PageLoader } from "@/components/ui/PageLoader";

export default function AdminLoading() {
  return (
    <div className="flex-1 w-full h-full min-h-[50vh] flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
