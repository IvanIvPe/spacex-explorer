import styles from './Loading.module.css';

interface LoadingProps {
    text?: string;
}

export default function Loading({ text = 'Loading...' }: LoadingProps) {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
            <p className={styles.text}>{text}</p>
        </div>
    );
}
