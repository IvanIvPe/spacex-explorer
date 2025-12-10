'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './LaunchDetails.module.css';
import { LaunchDetail } from '@/types/launch';

export default function LaunchDetails() {
    const params = useParams();
    const launchId = params.id as string;
    const [launch, setLaunch] = useState<LaunchDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLaunchDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.spacexdata.com/v4/launches/${launchId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch launch details');
                }
                const data = await response.json();
                setLaunch(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch launch details');
                console.error('Error fetching launch details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (launchId) {
            fetchLaunchDetails();
        }
    }, [launchId]);

    if (loading) return <div className={styles.container}>Loading launch details...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!launch) return <div className={styles.container}>Launch not found</div>;

    return (
        <div className={styles.container}>
            <Link href="/launches" className={styles.backLink}>
                Back to Launches
            </Link>

            <div className={styles.patchContainer}>
                {launch.links?.patch?.large && (
                    <img
                        src={launch.links.patch.large}
                        alt={launch.name}
                        className={styles.patch}
                    />
                )}
            </div>

            <h1>{launch.name}</h1>
            <p><strong>Flight Number:</strong> {launch.flight_number}</p>
            <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
            <p><strong>Status:</strong> {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}</p>

            {launch.details && (
                <div className={styles.section}>
                    <h2>Details</h2>
                    <p>{launch.details}</p>
                </div>
            )}

            {launch.links?.flickr?.original && launch.links.flickr.original.length > 0 && (
                <div className={styles.section}>
                    <h2>Gallery</h2>
                    <div className={styles.gallery}>
                        {launch.links.flickr.original.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`${launch.name} - Image ${idx + 1}`}
                                className={styles.galleryImage}
                            />
                        ))}
                    </div>
                </div>
            )}

            {launch.rocket && (
                <div className={styles.section}>
                    <h2>Rocket</h2>
                    <p>{launch.rocket}</p>
                </div>
            )}

            {launch.launchpad && (
                <div className={styles.section}>
                    <h2>Launchpad</h2>
                    <p>{launch.launchpad}</p>
                </div>
            )}

            {launch.links?.youtube_id && (
                <div className={styles.section}>
                    <h2>Video</h2>
                    <a
                        href={`https://youtube.com/watch?v=${launch.links.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.backLink}
                    >
                        Watch on YouTube
                    </a>
                </div>
            )}



            {launch.links?.wikipedia && (
                <div className={styles.section}>
                    <h2>More Info</h2>
                    <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.backLink}
                    >
                        Read on Wikipedia
                    </a>
                </div>
            )}
        </div>
    );
}
