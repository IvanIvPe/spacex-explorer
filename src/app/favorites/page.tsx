import Favorites from "@/components/favorites/Favorites";
import { getLaunchesServer } from "@/app/api/server/launches";

export default async function FavoritesPage() {
    const launches = await getLaunchesServer();
    return <Favorites launches={launches.docs} />;
    
}
