'use client';
import Link from 'next/link';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { Launch } from '@/types/launch';
import Button from '@/components/ui/Button';
import styles from './Favorites.module.css';
import { useQuery } from '@tanstack/react-query';
import { getLaunchesByIds } from '@/services/spacexApi';
import { Star, Rocket, X, ArrowRight, StarOff } from 'lucide-react';

export default function Favorites() {
  const { favoriteIds, removeFavorite, hasHydrated } = useFavoritesStore();

  const { data: favoriteLaunches = [], isLoading, isError, refetch } = useQuery<Launch[]>({
    queryKey: ['favorites', favoriteIds],
    queryFn: () => 
      favoriteIds.length > 0 ? getLaunchesByIds(favoriteIds) : Promise.resolve([]),
    enabled: hasHydrated,
  });

  const handleRemove = (id: string) => {
    removeFavorite(id);
  };
  
  if (!hasHydrated || isLoading) {
    return <div className={styles.loading}>Loading your favorites...</div>;
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <h1>
          <Star className={styles.headerIcon} size={24} />
          Your Favorite Launches
        </h1>
        <div className={styles.emptyState}>
          <p>Error loading your favorite launches.</p>
          <div className={styles.actions}>
            <Button onClick={() => refetch()} variant="primary">
              Retry
            </Button>
            <Link href="/launches" className={styles.link}>
              Browse Launches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>
        <Star className={styles.headerIcon} size={24} />
        Your Favorite Launches
      </h1>
      
      {favoriteIds.length > 0 && (
        <span className={styles.countBadge}>
          <Rocket size={12} />
          {favoriteIds.length} launch{favoriteIds.length !== 1 ? 'es' : ''}
        </span>
      )}

      {favoriteLaunches.length === 0 ? (
        <div className={styles.emptyState}>
          <StarOff className={styles.emptyIcon} size={56} />
          <p>You haven't added any launches to your favorites yet.</p>
          <Link href="/launches" className={styles.link}>
            Browse Launches
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {favoriteLaunches.map((launch) => (
            <li key={launch.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <h2>{launch.name}</h2>
                <p className={styles.cardDate}>
                  {new Date(launch.date_utc).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'UTC'
                  })}
                </p>
                <p className={styles.cardStatus}>
                  Status: {launch.upcoming ? 'Upcoming' : launch.success ? 'Successful' : 'Failed'}
                </p>
              </div>

              <div className={styles.actions}>
                <Link href={`/launches/${launch.id}`} className={styles.link}>
                  View Details
                  <ArrowRight size={14} />
                </Link>
                <Button
                  onClick={() => handleRemove(launch.id)}
                  variant="removeButton"
                  aria-label="Remove from favorites"
                >
                  <X size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}