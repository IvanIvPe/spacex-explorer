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
import { useEffect, useState } from 'react';

interface LaunchsByYearProps {
    launches: Launch[];
}

export function LaunchsByYear({ launches }: LaunchsByYearProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDark(theme !== 'light');
        
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setIsDark(currentTheme !== 'light');
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        return () => observer.disconnect();
    }, []);

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

    const axisColor = isDark ? '#a0a0a0' : '#4b5563';
    const gridColor = isDark ? '#2a2a2a' : '#d1d5db';
    const tooltipBg = isDark ? '#1a1a1a' : '#ffffff';
    const tooltipBorder = isDark ? '#2a2a2a' : '#d1d5db';

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Launches by Year</h3>
            <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis 
                        dataKey="year" 
                        fontSize={13} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                        stroke={axisColor}
                        tick={{ fill: axisColor }}
                    />
                    <YAxis 
                        fontSize={13}
                        stroke={axisColor}
                        tick={{ fill: axisColor }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            border: `1px solid ${tooltipBorder}`,
                            borderRadius: '8px',
                            color: isDark ? '#ffffff' : '#1a1a1a'
                        }}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Bar dataKey="total" name="Total Launches" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Line 
                        type="monotone" 
                        dataKey="success" 
                        name="Successful Launches" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#10b981' }}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
