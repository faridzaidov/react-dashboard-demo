import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUser } from '../api/api';
import Spinner from '../components/Spinner';
import styles from './UserDetailPage.module.css';

function DetailRow({ label, value }) {
  return (
    <div className={styles.row}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{value}</dd>
    </div>
  );
}

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const data = await fetchUser(id);
        if (!cancelled) {
          setUser(data);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    load();
    // Cancel the state update if the component unmounts mid-fetch.
    return () => { cancelled = true; };
  }, [id]);

  if (status === 'loading') return <Spinner label="Loading profile…" />;

  if (status === 'error') {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.error} role="alert">
            <p>⚠ {error}</p>
            <Link to="/" className={styles.backLink}>← Back to users</Link>
          </div>
        </div>
      </main>
    );
  }

  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>← Back to users</Link>

        <div className={styles.card}>
          <div className={styles.hero}>
            <div className={styles.avatar}>{initials}</div>
            <div>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>

          <div className={styles.sections}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <dl className={styles.list}>
                <DetailRow label="Email" value={<a href={`mailto:${user.email}`}>{user.email}</a>} />
                <DetailRow label="Phone" value={user.phone} />
                <DetailRow label="Website" value={<a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>} />
              </dl>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Address</h2>
              <dl className={styles.list}>
                <DetailRow label="Street" value={`${user.address.street}, ${user.address.suite}`} />
                <DetailRow label="City" value={user.address.city} />
                <DetailRow label="Zip" value={user.address.zipcode} />
              </dl>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Company</h2>
              <dl className={styles.list}>
                <DetailRow label="Name" value={user.company.name} />
                <DetailRow label="Catch phrase" value={user.company.catchPhrase} />
                <DetailRow label="Business" value={user.company.bs} />
              </dl>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
