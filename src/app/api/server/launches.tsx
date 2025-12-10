'use server'

export async function getLaunches() {
    const res = await fetch('https://api.spacexdata.com/v4/launches', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch launches');
    }
    return res.json();
}