import LaunchList from "@/components/launches/LaunchList/LaunchList";
import { getLaunchesServer } from "@/app/api/server/launches";

interface SearchParams {
    limit?: string;
    search?: string;
    timeline?: string;
    status?: string;
    sortBy?: string;
    startDate?: string;
    endDate?: string;
    hasPictures?: string;
}

export default async function LaunchListPage(props: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await props.searchParams;
    const limit = Number(params.limit) || 5;
    const sortBy = params.sortBy || 'date-desc';
    const [sort, order] = sortBy.split('-');
    
    const result = await getLaunchesServer({
        page: 1,
        search: params.search,
        timeline: params.timeline,
        status: params.status,
        sort: sort === 'name' ? 'name' : 'date_utc',
        order: order === 'asc' ? 'asc' : 'desc',
        startDate: params.startDate,
        endDate: params.endDate,
        hasPictures: params.hasPictures,
        limit,
    });
    
    return <LaunchList paginatedData={result} currentParams={params} />;
}