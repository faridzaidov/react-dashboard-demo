import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.msg}>Page not found</p>
      <Link to="/" className={styles.link}>Go back home</Link>
    </main>
  );
}
