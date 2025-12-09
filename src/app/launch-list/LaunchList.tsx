'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import styles from "@/app/launch-list/LaunchList.module.css";
import { getLaunches } from '@/app/services/spacexApi';

interface Launch {
    id: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_local?: string;
    success?: boolean | null;
    upcoming: boolean;
}

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
        const saved = localStorage.getItem('spacex_favorites');
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); 
        e.stopPropagation();

        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter(favId => favId !== id);
        } else {
            newFavorites = [...favorites, id];
        }
        
        setFavorites(newFavorites);
        localStorage.setItem('spacex_favorites', JSON.stringify(newFavorites));
    };

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                setLoading(true);
                const data = await getLaunches();
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
                    </div>
                    
                    <ul className={styles.launchList}>
                        {filteredLaunches.map((launch) => {
                            const isFav = favorites.includes(launch.id);
                            return (
                                <li key={launch.id} className={styles.launchItem}>
                                    <Link href={`/launch-details/${launch.id}`}>
                                        
                                        <button 
                                            onClick={(e) => toggleFavorite(e, launch.id)}
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