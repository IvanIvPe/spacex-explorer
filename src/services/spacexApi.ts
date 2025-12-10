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

export async function getLaunchesquery(limit: number = 10) {
    const res = await fetch(`https://api.spacexdata.com/v4/launches/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            options: {
                limit,
                sort: { date_utc: 'desc' },
            },
        }),
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch launches');
    }
    const data = await res.json();
    return data.docs;
}

export async function getLaunchesByIds(ids: string[]) {
    if (!ids.length) return [];

    const res = await fetch(`https://api.spacexdata.com/v4/launches/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: {
                _id: {
                    $in: ids
                }
            },
            options: {
                pagination: false,
                sort: {
                    date_utc: 'desc'
                },
            },
        }),
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch favorite launches');
    }
    const data = await res.json();
    return data.docs;
}
