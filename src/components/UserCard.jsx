import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

export default function UserCard({ user }) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <article className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {initials}
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p className={styles.meta}>
          <span>@{user.username}</span>
          <span className={styles.dot}>·</span>
          <span>{user.company.name}</span>
        </p>
      </div>
      <Link to={`/users/${user.id}`} className={styles.btn}>
        View profile →
      </Link>
    </article>
  );
}
