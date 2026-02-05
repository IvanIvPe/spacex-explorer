import { getAllLaunches } from '@/services/spacexApi';
import { LaunchsByYear, SuccessRatePie } from '@/components/charts';
import styles from '@/components/charts/Charts.module.css';

export default async function DashboardPage() {
    const launches = await getAllLaunches();
    
    const totalLaunches = launches.length;
    const successfulLaunches = launches.filter((l: { success?: boolean }) => l.success === true).length;
    const upcomingLaunches = launches.filter((l: { upcoming?: boolean }) => l.upcoming === true).length;

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.dashboardTitle}>Launch Dashboard</h1>
            
            <div className={styles.statsCards}>
                <div className={styles.statCard}>
                    <h4>Total Launches</h4>
                    <p>{totalLaunches}</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Successful</h4>
                    <p>{successfulLaunches}</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Upcoming</h4>
                    <p>{upcomingLaunches}</p>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <LaunchsByYear launches={launches} />
                <SuccessRatePie launches={launches} />
            </div>
        </div>
    );
}
