import LaunchList from "@/components/launches/LaunchList/LaunchList";
import { getLaunchesServer } from "@/app/api/server/launches";

export default async function LaunchListPage() {
    const launches = await getLaunchesServer();
    return <LaunchList launches={launches} />;
}