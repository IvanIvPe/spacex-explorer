import { getLaunchByIdServer } from "@/app/api/server/launches";
import LaunchDetails from "@/components/launches/LaunchDetails/LaunchDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LaunchDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const launch = await getLaunchByIdServer(id);
    
    return <LaunchDetails launch={launch} />;
}