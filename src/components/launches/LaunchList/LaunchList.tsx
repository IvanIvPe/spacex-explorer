'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import styles from "./LaunchList.module.css";
import { Launch } from '@/types/launch';
import { getFavorites, toggleFavorite as toggleFav } from '@/lib/localStorage';
import { PaginatedResponse } from '@/services/spacexApi';

interface LaunchListProps {
    paginatedData: PaginatedResponse<Launch>;
    currentParams: {
        limit?: string;
        search?: string;
        timeline?: string;
        status?: string;
        sortBy?: string;
        startDate?: string;
        endDate?: string;
    };
}

export default function LaunchList({ paginatedData, currentParams }: LaunchListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [timeline, setTimeline] = useState('all');
    const [status, setStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        const newFavorites = toggleFav(id);
        setFavorites(newFavorites);
    };

    const updateFilters = () => {
        const params = new URLSearchParams();
        
        if (searchQuery) params.set('search', searchQuery);
        if (timeline !== 'all') params.set('timeline', timeline);
        if (status !== 'all') params.set('status', status);
        if (sortBy !== 'date-desc') params.set('sortBy', sortBy);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        params.set('limit', '5');
        
        router.push(`/launches?${params.toString()}`);
    };

    const handleLoadMore = () => {
        const params = new URLSearchParams(searchParams.toString());
        const currentLimit = Number(params.get('limit')) || 5;
        params.set('limit', (currentLimit + 5).toString());
        router.push(`/launches?${params.toString()}`, { scroll: false });
    };

    return (
        <div className={styles.launchListContainer}>
            <h1>SpaceX Launches</h1>

            <div className={styles.filters}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    defaultValue={currentParams.search || ''}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && updateFilters()}
                />

                <select defaultValue={currentParams.timeline || 'all'} onChange={e => { setTimeline(e.target.value); }}>
                    <option value="all">All Timeline</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                </select>

                <select defaultValue={currentParams.status || 'all'} onChange={e => { setStatus(e.target.value); }}>
                    <option value="all">All Status</option>
                    <option value="success">Successful</option>
                    <option value="failure">Failed</option>
                </select>

                <select defaultValue={currentParams.sortBy || 'date-desc'} onChange={e => { setSortBy(e.target.value); }}>
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                </select>

                <input 
                    type="date" 
                    placeholder="Start Date" 
                    defaultValue={currentParams.startDate || ''}
                    onChange={e => setStartDate(e.target.value)} 
                />
                <input 
                    type="date" 
                    placeholder="End Date" 
                    defaultValue={currentParams.endDate || ''}
                    onChange={e => setEndDate(e.target.value)} 
                />
                
                <Button onClick={updateFilters} variant="primary">
                    Apply Filters
                </Button>
            </div>

            <ul className={styles.launchList}>
                {paginatedData.docs.map((launch) => {
                    const isFav = favorites.includes(launch.id);
                    return (
                        <li key={launch.id} className={styles.launchItem}>
                            <Link href={`/launches/${launch.id}`}>
                                <Button
                                    onClick={(e) => handleToggleFavorite(e, launch.id)}
                                    variant="favorite"
                                    isFavorite={isFav}
                                    className={styles.favButton}
                                    aria-label={isFav ? "Unfavorite" : "Favorite"}
                                >
                                    {isFav ? '★' : '☆'}
                                </Button>
                                <h2>
                                    {launch.name}
                                    {launch.links?.flickr?.original && launch.links.flickr.original.length > 0 && (
                                        <span className={styles.cameraIcon} title="Image Exists"> 📷</span>
                                    )}
                                </h2>
                                <p>
                                    Date: {new Date(launch.date_utc).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        timeZone: 'UTC'
                                    })}
                                </p>
                                <p>Status: {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {paginatedData.docs.length < paginatedData.totalDocs && (
                <div className={styles.loadMoreContainer}>
                    <Button 
                        onClick={handleLoadMore}
                        variant="primary"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
}