'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { LaunchSummary } from '@/types/launch';
import styles from './Charts.module.css';

interface SuccessRateProps {
    launches: LaunchSummary[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (!active || !payload || payload.length === 0) return null;

    const dataPoint = payload[0]?.payload as { rate: number; total: number; success: number } | undefined;
    const rate = dataPoint?.rate ?? 0;
    const total = dataPoint?.total ?? 0;
    const success = dataPoint?.success ?? 0;

    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipYear}>{label}</p>
            <div className={styles.tooltipRow}>
                <span className={styles.tooltipDot} style={{ background: '#8b5cf6' }} />
                <span>Success Rate</span>
                <span className={styles.tooltipValue}>{rate}%</span>
            </div>
            <div className={styles.tooltipDivider} />
            <div className={styles.tooltipRow}>
                <span>Successful</span>
                <span className={styles.tooltipValue}>{success} / {total}</span>
            </div>
        </div>
    );
}

export function SuccessRate({ launches }: SuccessRateProps) {
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

    const data = Object.values(yearData).map(d => ({
        ...d,
        rate: d.total > 0 ? Math.round((d.success / d.total) * 100) : 0,
    }));

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Success Rate by Year</h3>
            <ResponsiveContainer width="100%" height={450}>
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="successRateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="year"
                        fontSize={13}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        fontSize={13}
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        isAnimationActive={false}
                        allowEscapeViewBox={{ x: false, y: false }}
                    />
                    <Area
                        type="monotone"
                        dataKey="rate"
                        name="Success Rate"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#successRateGradient)"
                        dot={{ r: 4, fill: '#8b5cf6' }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
