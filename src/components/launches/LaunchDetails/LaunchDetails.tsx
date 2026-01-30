'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './LaunchDetails.module.css';
import { LaunchDetail } from '@/types/launch';
import ImageGallery from '@/components/ui/ImageGallery';

interface LaunchDetailsProps {
    launch: LaunchDetail;
}

export default function LaunchDetails({ launch }: LaunchDetailsProps) {
    if (!launch) {
        return <div className={styles.container}>Launch data not available.</div>;
    }

    return (
        <div className={styles.container}>
            <Link href="/launches" className={styles.backLink}>
                Back to Launches
            </Link>

            <div className={styles.patchContainer}>
                {launch.links?.patch?.large && (
                    <Image
                        src={launch.links.patch.large}
                        alt={launch.name}
                        width={150}
                        height={150}
                        className={styles.patch}
                        priority
                    />
                )}
            </div>

            <h1>{launch.name}</h1>
            <p><strong>Flight Number:</strong> {launch.flight_number}</p>
            <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString('en-US', { timeZone: 'UTC' })}</p>
            <p><strong>Status:</strong> {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}</p>

            {launch.details && (
                <div className={styles.section}>
                    <h2>Details</h2>
                    <p>{launch.details}</p>
                </div>
            )}

            <div className={styles.section}>
                <h2>Gallery</h2>
                <ImageGallery 
                    images={launch.links?.flickr?.original || []} 
                    altPrefix={launch.name} 
                />
            </div>

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