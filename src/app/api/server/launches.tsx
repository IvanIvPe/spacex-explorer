'use server';

import { getLaunches, getLaunchById, LaunchParams, PaginatedResponse } from '@/services/spacexApi';
import { Launch } from '@/types/launch';

export async function getLaunchesServer(params?: LaunchParams): Promise<PaginatedResponse<Launch>> {
    try {
        const result = await getLaunches(params);
        return result;
    } catch (error) {
        console.error('Error fetching launches:', error);
        throw new Error('Failed to fetch launches');
    }
}

export async function getLaunchByIdServer(id: string) {
    try {
        const launch = await getLaunchById(id);
        return launch;
    } catch (error) {
        console.error('Error fetching launch:', error);
        throw new Error('Failed to fetch launch data');
    }
}