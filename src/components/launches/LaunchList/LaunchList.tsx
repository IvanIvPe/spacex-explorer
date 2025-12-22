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

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        const newFavorites = toggleFav(id);
        setFavorites(newFavorites);
    };

    const updateFilters = (formData: FormData) => {
        const params = new URLSearchParams();
        
        const search = formData.get('search') as string;
        const timeline = formData.get('timeline') as string;
        const status = formData.get('status') as string;
        const sortBy = formData.get('sortBy') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;
        
        if (search) params.set('search', search);
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

            <form className={styles.filters} onSubmit={(e) => {
                e.preventDefault();
                updateFilters(new FormData(e.currentTarget));
            }}>
                <input 
                    type="text"
                    name="search"
                    placeholder="Search..." 
                    defaultValue={currentParams.search || ''}
                />

                <select name="timeline" defaultValue={currentParams.timeline || 'all'}>
                    <option value="all">All Timeline</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                </select>

                <select name="status" defaultValue={currentParams.status || 'all'}>
                    <option value="all">All Status</option>
                    <option value="success">Successful</option>
                    <option value="failure">Failed</option>
                </select>

                <select name="sortBy" defaultValue={currentParams.sortBy || 'date-desc'}>
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                </select>

                <input 
                    type="date"
                    name="startDate"
                    placeholder="Start Date" 
                    defaultValue={currentParams.startDate || ''}
                />
                <input 
                    type="date"
                    name="endDate"
                    placeholder="End Date" 
                    defaultValue={currentParams.endDate || ''}
                />
                
                <Button type="submit" variant="primary">
                    Apply Filters
                </Button>
            </form>

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