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

interface LaunchesByYearProps {
    launches: Launch[];
}

export function LaunchesByYear({ launches }: LaunchesByYearProps) {
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
            <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="year" 
                        fontSize={13} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                    />
                    <YAxis fontSize={13} />
                    <Tooltip />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="total" name="Total Launches" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Line 
                        type="monotone" 
                        dataKey="success" 
                        name="Successful Launches" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
