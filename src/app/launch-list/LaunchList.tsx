'use client';

import React, { useState, useMemo } from 'react';
import styles from "@/app/launch-list/LaunchList.module.css";

interface Launch {
    flight_number: number;
    mission_name: string;
    launch_date_utc: string;
    launch_date_local?: string;
    launch_success?: boolean | null;
    upcoming: boolean;
    id?: string;
}

interface LaunchListProps {
    launches: Launch[];
}

export default function LaunchList({ launches = [] }: LaunchListProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [timeline, setTimeline] = useState<string>('all');
    const [status, setStatus] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date-desc');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const filteredLaunches = useMemo(() => {
        if (!Array.isArray(launches)) return [];

        return launches
            .filter((launch) => {
                if (!launch) return false;

                const missionName = launch.mission_name || '';
                const matchesSearch = missionName.toLowerCase().includes(searchQuery.toLowerCase());

                let matchesTimeline = true;
                if (timeline === 'upcoming') matchesTimeline = launch.upcoming === true;
                if (timeline === 'past') matchesTimeline = launch.upcoming === false;

                let matchesStatus = true;
                if (status === 'success') matchesStatus = launch.launch_success === true;
                if (status === 'failure') matchesStatus = launch.launch_success === false;

                let matchesDate = true;
                const dateString = launch.launch_date_utc || launch.launch_date_local;
                const launchDate = dateString ? new Date(dateString) : null;

                if (launchDate && !isNaN(launchDate.getTime())) {
                    if (startDate) matchesDate = matchesDate && launchDate >= new Date(startDate);
                    if (endDate) matchesDate = matchesDate && launchDate <= new Date(endDate);
                } else if (startDate || endDate) {
                    matchesDate = false;
                }

                return matchesSearch && matchesTimeline && matchesStatus && matchesDate;
            })
            .sort((a, b) => {
                const dateA = new Date(a.launch_date_utc || 0);
                const dateB = new Date(b.launch_date_utc || 0);
                const nameA = a.mission_name || '';
                const nameB = b.mission_name || '';

                switch (sortBy) {
                    case 'date-desc':
                        return dateB.getTime() - dateA.getTime();
                    case 'date-asc':
                        return dateA.getTime() - dateB.getTime();
                    case 'name-asc':
                        return nameA.localeCompare(nameB);
                    case 'name-desc':
                        return nameB.localeCompare(nameA);
                    default:
                        return 0;
                }
            });
    }, [launches, searchQuery, timeline, status, sortBy, startDate, endDate]);

    return (
        <div className={styles.launchListContainer}>
            <h1>SpaceX Launches</h1>
            <div className={styles.filters}>
                <input
                    type="text" 
                    placeholder="Search by mission name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />      
                <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    <option value="all">All Launches</option>   
                    <option value="upcoming">Upcoming Launches</option>
                    <option value="past">Past Launches</option>
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="success">Successful Launches</option>
                    <option value="failure">Failed Launches</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date-desc">Date: Newest to Oldest</option>
                    <option value="date-asc">Date: Oldest to Newest</option>
                    <option value="name-asc">Mission Name: A to Z</option>
                    <option value="name-desc">Mission Name: Z to A</option>
                </select>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
            </div>
            <ul className={styles.launchList}>
                {filteredLaunches.map((launch) => ( 
                    <li key={launch.flight_number} className={styles.launchItem}>
                        <h2>{launch.mission_name}</h2>
                        <p>Date: {new Date(launch.launch_date_utc).toLocaleDateString()}</p>
                        <p>Status: {launch.upcoming ? 'Upcoming' : launch.launch_success ? 'Successful' : 'Failed'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}