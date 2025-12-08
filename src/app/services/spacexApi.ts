const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

async function spacexFetch<T>(endpoint: string): Promise<T> {
  const url = `${SPACEX_API_BASE}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`SpaceX API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getLaunches() {
  return spacexFetch('/launches');
}

export async function getRockets() {
  return spacexFetch('/rockets');
}

export async function getLaunchpads() {
  return spacexFetch('/launchpads');
}

export async function queryLaunches(query: any) {
  const url = `${SPACEX_API_BASE}/launches/query`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`SpaceX API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getRocketById(id: string) {
  return spacexFetch(`/rockets/${id}`);
}


export async function getLaunchpadById(id: string) {
  return spacexFetch(`/launchpads/${id}`);
}
