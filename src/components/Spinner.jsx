import styles from './Spinner.module.css';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={label}>
      <div className={styles.ring} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
