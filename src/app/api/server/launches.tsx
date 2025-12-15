'use server';

import { getLaunches, getLaunchById, LaunchParams } from '@/services/spacexApi';

export async function getLaunchesServer(params?: LaunchParams) {
    try {
        const launches = await getLaunches(params);
        return launches;
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