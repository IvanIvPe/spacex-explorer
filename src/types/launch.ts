export interface Launch {
    id: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_local?: string;
    success?: boolean | null;
    upcoming: boolean;
}

export interface LaunchDetail extends Launch {
    rocket?: string;
    launchpad?: string;
    details?: string;
    links?: {
        patch?: { small?: string; large?: string };
        flickr?: { small?: string[]; original?: string[] };
        youtube_id?: string;
        wikipedia?: string;
        article?: string;
    };
}
