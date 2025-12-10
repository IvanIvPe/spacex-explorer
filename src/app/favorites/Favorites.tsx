'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Favorites.module.css";
import { getLaunchesByIds } from "@/services/spacexApi";
import { Launch } from "@/types/launch";
import { getFavorites, toggleFavorite } from "@/lib/localStorage";

const Favorites: React.FC = () => {
    const [launches, setLaunches] = useState<Launch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            const favIds = getFavorites();

            if (favIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const data = await getLaunchesByIds(favIds);
                setLaunches(data as Launch[]);
            } catch (error) {
                console.error("Failed to load favorites", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const removeFavorite = (id: string) => {
        toggleFavorite(id);
        setLaunches((prev) => prev.filter((l) => l.id !== id));
    };

    if (loading) {
        return <div className={styles.container}><p>Loading favorites...</p></div>;
    }

    if (launches.length === 0) {
        return (
            <div className={styles.container}>
                <h1>Your Favorites</h1>
                <div className={styles.emptyState}>
                    <p>You haven't saved any launches yet.</p>
                    <p>Go to <Link href="/launches">Launches</Link> to add some!</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Your Favorites</h1>
            <ul className={styles.launchList}>
                {launches.map((launch) => (
                    <li key={launch.id} className={styles.launchItem}>
                        <button
                            onClick={() => removeFavorite(launch.id)}
                            className={styles.favButton}
                            aria-label="Remove from favorites"
                            title="Remove from favorites"
                        >
                            ★
                        </button>

                        <Link href={`/launch-details/${launch.id}`}>
                            <h2>{launch.name}</h2>
                            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
                            <p>Status: {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;