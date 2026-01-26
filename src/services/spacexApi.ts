import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.spacexdata.com/v4',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface LaunchParams {
    order?: 'asc' | 'desc';
    sort?: string;
    search?: string;
    limit?: number;
    page?: number;
    timeline?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    hasPictures?: string;
}

export interface PaginatedResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface LaunchQuery {
    name?: {
        $regex: string;
        $options: string;
    };
    upcoming?: boolean;
    success?: boolean;
    date_utc?: {
        $gte?: string;
        $lte?: string;
    };
    'links.flickr.original.0'?: { $exists: boolean };
}

export const getLaunches = async (params?: LaunchParams) => {
    const query: LaunchQuery = {};
    
    if (params?.search) {
        query.name = { $regex: params.search, $options: 'i' };
    }
    
    if (params?.timeline === 'upcoming') {
        query.upcoming = true;
    } else if (params?.timeline === 'past') {
        query.upcoming = false;
    }
    
    if (params?.status === 'success') {
        query.success = true;
    } else if (params?.status === 'failure') {
        query.success = false;
    }
    
    if (params?.startDate || params?.endDate) {
        query.date_utc = {};
        if (params.startDate) {
            query.date_utc.$gte = params.startDate;
        }
        if (params.endDate) {
            query.date_utc.$lte = params.endDate;
        }
    }

    if (params?.hasPictures === 'yes') {
        query['links.flickr.original.0'] = { $exists: true };
    } else if (params?.hasPictures === 'no') {
        query['links.flickr.original.0'] = { $exists: false };
    }

    const response = await axiosInstance.post('/launches/query', {
        query,
        options: {
            limit: params?.limit || 10,
            page: params?.page || 1,
            sort: { [params?.sort || 'date_utc']: params?.order === 'asc' ? 1 : -1 },
            pagination: true,
        },
    });
    
    return response.data;
};

export const getLaunchById = async (id: string) => {
    const response = await axiosInstance.get(`/launches/${id}`);
    return response.data;
};

export const getLaunchesByIds = async (ids: string[]) => {
    if (ids.length === 0) return [];
    
    const response = await axiosInstance.post('/launches/query', {
        query: {
            _id: { $in: ids }
        },
        options: {
            pagination: false,
            sort: { date_utc: -1 },
        },
    });
    
    return response.data.docs;
};
