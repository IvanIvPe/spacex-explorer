import styles from './styles/loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
            <p className={styles.text}>Loading launch details...</p>
        </div>
    );
}
