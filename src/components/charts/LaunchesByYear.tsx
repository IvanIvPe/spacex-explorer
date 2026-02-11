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
import type { TooltipProps } from 'recharts';
import { LaunchSummary } from '@/types/launch';
import styles from './Charts.module.css';

interface LaunchesByYearProps {
    launches: LaunchSummary[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (!active || !payload || payload.length === 0) return null;

    const total = payload.find(p => p.dataKey === 'total')?.value ?? 0;
    const success = payload.find(p => p.dataKey === 'success')?.value ?? 0;
    const rate = Number(total) > 0 ? Math.round((Number(success) / Number(total)) * 100) : 0;

    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipYear}>{label}</p>
            <div className={styles.tooltipRow}>
                <span className={styles.tooltipDot} style={{ background: '#3b82f6' }} />
                <span>Total Launches</span>
                <span className={styles.tooltipValue}>{total}</span>
            </div>
            <div className={styles.tooltipRow}>
                <span className={styles.tooltipDot} style={{ background: '#10b981' }} />
                <span>Successful</span>
                <span className={styles.tooltipValue}>{success}</span>
            </div>
            <div className={styles.tooltipDivider} />
            <div className={styles.tooltipRow}>
                <span>Success Rate</span>
                <span className={styles.tooltipValue}>{rate}%</span>
            </div>
        </div>
    );
}

export function LaunchesByYear({ launches }: LaunchesByYearProps) {
    const yearData = launches.reduce<Record<string, { year: string; total: number; success: number }>>((acc, launch) => {
        const year = new Date(launch.date_utc).getUTCFullYear().toString();
        
        if (!acc[year]) {
            acc[year] = { year, total: 0, success: 0 };
        }
        
        acc[year].total += 1;
        if (launch.success === true) {
            acc[year].success += 1;
        }
        
        return acc;
    }, {});

    const data = Object.values(yearData);

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
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
                        isAnimationActive={false}
                        allowEscapeViewBox={{ x: false, y: false }}
                    />
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
