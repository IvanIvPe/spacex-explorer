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
}

export const getLaunches = async (params?: LaunchParams) => {
    const response = await axiosInstance.post('/launches/query', {
        query: params?.search ? { name: { $regex: params.search, $options: 'i' } } : {},
        options: {
            limit: params?.limit || 200,
            sort: { [params?.sort || 'date_utc']: params?.order || 'desc' },
        },
    });
    return response.data.docs;
};

export const getLaunchById = async (id: string) => {
    const response = await axiosInstance.get(`/launches/${id}`);
    return response.data;
};
