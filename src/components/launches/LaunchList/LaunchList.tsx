'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import styles from "./LaunchList.module.css";
import { Launch } from '@/types/launch';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { PaginatedResponse } from '@/services/spacexApi';
import { useDebouncedCallback } from 'use-debounce';

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
    const { favoriteIds, toggleFavorite } = useFavoritesStore();

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };


    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        router.push(`/launches?${params.toString()}`);
    }, 500);


    const updateFilters = (formData: FormData) => {
        const params = new URLSearchParams(searchParams.toString());
        
        const timeline = formData.get('timeline') as string;
        const status = formData.get('status') as string;
        const sortBy = formData.get('sortBy') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;

        if (timeline !== 'all') {
            params.set('timeline', timeline);
        } else {
            params.delete('timeline');
        }
        
        if (status !== 'all') {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        
        if (sortBy !== 'date-desc') {
            params.set('sortBy', sortBy);
        } else {
            params.delete('sortBy');
        }
        
        if (startDate) {
            params.set('startDate', startDate);
        } else {
            params.delete('startDate');
        }
        
        if (endDate) {
            params.set('endDate', endDate);
        } else {
            params.delete('endDate');
        }
        
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

            <div className={styles.filtersContainer}>
                <div className={styles.filterGroup}>
                    <label htmlFor="search">Search</label>
                    <input 
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search..." 
                        defaultValue={currentParams.search || ''}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <form className={styles.filters} onSubmit={(e) => {
                    e.preventDefault();
                    updateFilters(new FormData(e.currentTarget));
                }}>
                <div className={styles.filterGroup}>
                    <label htmlFor="timeline">Timeline</label>
                    <select id="timeline" name="timeline" defaultValue={currentParams.timeline || 'all'}>
                        <option value="all">All Timeline</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" defaultValue={currentParams.status || 'all'}>
                        <option value="all">All Status</option>
                        <option value="success">Successful</option>
                        <option value="failure">Failed</option>
                    </select>
                </div>
   
                <div className={styles.filterGroup}>
                    <label htmlFor="sortBy">Sort By</label>
                    <select id="sortBy" name="sortBy" defaultValue={currentParams.sortBy || 'date-desc'}>
                        <option value="date-desc">Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input 
                        id="startDate"
                        type="date"
                        name="startDate"
                        defaultValue={currentParams.startDate || ''}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="endDate">End Date</label>
                    <input 
                        id="endDate"
                        type="date"
                        name="endDate"
                        defaultValue={currentParams.endDate || ''}
                    />
                </div>
                
                <Button type="submit" variant="primary">
                    Apply Filters
                </Button>
            </form>
            </div>

            <ul className={styles.launchList}>
                {paginatedData.docs.map((launch) => {
                    const isFav = favoriteIds.includes(launch.id);
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