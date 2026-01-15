'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { Launch } from '@/types/launch';
import Button from '@/components/ui/Button';
import styles from './Favorites.module.css';

interface FavoritesProps {
  launches: Launch[];
}

export default function Favorites({ launches }: FavoritesProps) {
  const { favoriteIds, removeFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
  };

  const favoriteLaunches = launches.filter(launch => favoriteIds.includes(launch.id));

  if (!mounted) {
    return <div className={styles.loading}>Loading your favorites...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Favorite Launches</h1>

      {favoriteLaunches.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't added any launches to your favorites yet.</p>
          <Link href="/launches" className={styles.link}>
            Browse Launches
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
                </Link>
                <Button
                  onClick={() => handleRemove(launch.id)}
                  variant="removeButton"
                  aria-label="Remove from favorites"
                >
                  X
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}