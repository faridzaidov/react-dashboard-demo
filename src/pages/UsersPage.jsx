import { useState, useEffect, useCallback } from 'react';
import { fetchUsers } from '../api/api';
import UserCard from '../components/UserCard';
import Spinner from '../components/Spinner';
import styles from './UsersPage.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Team Directory</h1>
          <p className={styles.subtitle}>
            Data fetched live from{' '}
            <a
              href="https://jsonplaceholder.typicode.com/users"
              target="_blank"
              rel="noreferrer"
            >
              JSONPlaceholder
            </a>
          </p>
        </header>

        {status === 'loading' && <Spinner label="Fetching users…" />}

        {status === 'error' && (
          <div className={styles.error} role="alert">
            <p className={styles.errorMsg}>⚠ {error}</p>
            <button className={styles.retryBtn} onClick={loadUsers}>
              Retry
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.grid}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
