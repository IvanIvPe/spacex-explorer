'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PolarAngleAxis } from 'recharts';
import { Launch } from '@/types/launch';
import styles from './Charts.module.css';

interface SuccessRatePieProps {
    launches: Launch[];
}

const COLORS = ['#3b82f6', '#ef4444'];

export function SuccessRatePie({ launches }: SuccessRatePieProps) {
    const pastLaunches = launches.filter(l => !l.upcoming);
    
    const stats = pastLaunches.reduce(
        (acc, launch) => {
            if (launch.success === true) acc.success += 1;
            else if (launch.success === false) acc.failed += 1;
            return acc;
        },
        { success: 0, failed: 0 }
    );

    const data = [
        { name: 'Successful', value: stats.success },
        { name: 'Failed', value: stats.failed },
    ];

    const successRate = pastLaunches.length > 0 
        ? ((stats.success / pastLaunches.length) * 100).toFixed(1) 
        : '0';

    return (
        <div className={styles.chartContainer}>
            <div className={styles.pieHeader}>
                <h3 className={styles.chartTitle}>Success Rate</h3>
                <div className={styles.percentageBadge}>{successRate}%</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        label={false}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} launches`} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            <div className={styles.statsRow}>
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>{stats.success}</div>
                    <div className={styles.statLabel}>Successful</div>
                </div>
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>{stats.failed}</div>
                    <div className={styles.statLabel}>Failed</div>
                </div>
            </div>
        </div>
    );
}
