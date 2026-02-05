'use client';

import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Launch } from '@/types/launch';
import styles from './Charts.module.css';

interface LaunchsByYearProps {
    launches: Launch[];
}

export function LaunchsByYear({ launches }: LaunchsByYearProps) {
    const yearData = launches.reduce<Record<string, { year: string; total: number; success: number }>>((acc, launch) => {
        const year = new Date(launch.date_utc).getFullYear().toString();
        
        if (!acc[year]) {
            acc[year] = { year, total: 0, success: 0 };
        }
        
        acc[year].total += 1;
        if (launch.success === true) {
            acc[year].success += 1;
        }
        
        return acc;
    }, {});

    const data = Object.values(yearData).sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Launches by Year</h3>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" name="Total" fill="#8884d8" />
                    <Line type="monotone" dataKey="success" name="Success" stroke="#82ca9d" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
