'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import useConfig from '../hooks/useConfig';
import ScreenRenderer from '../components/ScreenRenderer';

function HomeContent() {
  const searchParams = useSearchParams();
  const appId = searchParams.get('appId') || '600';
  const { safeSchema, loading, error } = useConfig(appId);

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={{ color: '#666' }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.center, ...styles.errorBox }}>
        <h2 style={{ color: '#e53e3e', marginBottom: 8 }}>Failed to load</h2>
        <p style={{ color: '#555' }}>{error}</p>
        <button style={styles.retryBtn} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!safeSchema) {
    return (
      <div style={styles.center}>
        <p style={{ color: '#999' }}>No schema available.</p>
      </div>
    );
  }

  return <ScreenRenderer safeSchema={safeSchema} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div style={styles.center}><p>Loading...</p></div>}>
      <HomeContent />
    </Suspense>
  );
}

const styles = {
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 12,
  },
  errorBox: {
    background: '#fff5f5',
    border: '1px solid #fed7d7',
    borderRadius: 8,
    padding: 32,
    maxWidth: 360,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 12,
    padding: '8px 20px',
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
};
