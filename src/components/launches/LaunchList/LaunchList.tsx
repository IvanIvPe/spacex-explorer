'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import styles from "./LaunchList.module.css";
import { getLaunches, getLaunchesquery } from '@/services/spacexApi';
import { Launch } from '@/types/launch';
import { getFavorites, toggleFavorite as toggleFav } from '@/lib/localStorage';

interface LaunchListProps {
    launches?: Launch[];
}

export default function LaunchList({ launches: initialLaunches = [] }: LaunchListProps) {
    const [launches, setLaunches] = useState<Launch[]>(initialLaunches);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [timeline, setTimeline] = useState('all');
    const [status, setStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        const newFavorites = toggleFav(id);
        setFavorites(newFavorites);
    };

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                setLoading(true);
                const data = await getLaunchesquery(5);
                setLaunches(data as Launch[]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch');
            } finally {
                setLoading(false);
            }
        };
        fetchLaunches();
    }, []);

    const filteredLaunches = useMemo(() => {
        if (!Array.isArray(launches)) return [];
        return launches
            .filter((launch) => {
                if (!launch) return false;
                const matchesSearch = (launch.name || '').toLowerCase().includes(searchQuery.toLowerCase());

                let matchesTimeline = true;
                if (timeline === 'upcoming') matchesTimeline = launch.upcoming === true;
                if (timeline === 'past') matchesTimeline = launch.upcoming === false;

                let matchesStatus = true;
                if (status === 'success') matchesStatus = launch.success === true;
                if (status === 'failure') matchesStatus = launch.success === false;

                let matchesDate = true;
                const d = new Date(launch.date_utc || launch.date_local || '');
                if (startDate && d) matchesDate = matchesDate && d >= new Date(startDate);
                if (endDate && d) matchesDate = matchesDate && d <= new Date(endDate);

                return matchesSearch && matchesTimeline && matchesStatus && matchesDate;
            })
            .sort((a, b) => {
                const dateA = new Date(a.date_utc || 0).getTime();
                const dateB = new Date(b.date_utc || 0).getTime();
                if (sortBy === 'date-desc') return dateB - dateA;
                if (sortBy === 'date-asc') return dateA - dateB;
                if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
                if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
                return 0;
            });
    }, [launches, searchQuery, timeline, status, sortBy, startDate, endDate]);

    return (
        <div className={styles.launchListContainer}>
            <h1>SpaceX Launches</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <>
                    <div className={styles.filters}>
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

                        <select value={timeline} onChange={e => setTimeline(e.target.value)}>
                            <option value="all">All Timeline</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                        </select>

                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="success">Successful</option>
                            <option value="failure">Failed</option>
                        </select>

                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="date-desc">Date (Newest)</option>
                            <option value="date-asc">Date (Oldest)</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>

                        <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>

                    <ul className={styles.launchList}>
                        {filteredLaunches.map((launch) => {
                            const isFav = favorites.includes(launch.id);
                            return (
                                <li key={launch.id} className={styles.launchItem}>
                                    <Link href={`/launch-details/${launch.id}`}>

                                        <button
                                            onClick={(e) => handleToggleFavorite(e, launch.id)}
                                            className={`${styles.favButton} ${isFav ? styles.active : ''}`}
                                            aria-label={isFav ? "Unfavorite" : "Favorite"}
                                        >
                                            {isFav ? '★' : '☆'}
                                        </button>

                                        <h2>{launch.name}</h2>
                                        <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
                                        <p>Status: {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}</p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}
