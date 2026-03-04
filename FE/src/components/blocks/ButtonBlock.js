'use client';

import { useState } from 'react';
import { executeAction } from '../../actions/actionMap';

const VARIANT_COLORS = {
  primary: { background: 'var(--primary-color, #0070f3)', color: '#fff' },
  danger:  { background: '#e53e3e',                       color: '#fff' },
  ghost:   { background: 'transparent', color: 'var(--primary-color, #0070f3)', border: '2px solid var(--primary-color, #0070f3)' },
  default: { background: '#e2e8f0',     color: 'var(--text-color, #1a1a1a)' },
};

export default function ButtonBlock({ component }) {
  const { label, action, variant = 'default', url } = component;
  const [loading,  setLoading]  = useState(false);
  const [feedback, setFeedback] = useState(null); // 'success' | 'error' | null

  const handleClick = async () => {
    if (!action) return;
    setLoading(true);
    setFeedback(null);
    try {
      await executeAction(action, { url });
      setFeedback('success');
    } catch {
      setFeedback('error');
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const variantStyle = VARIANT_COLORS[variant] || VARIANT_COLORS.default;

  return (
    <div style={styles.wrapper}>
      <button
        style={{ ...styles.btn, ...variantStyle, opacity: loading ? 0.6 : 1 }}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '...' : label}
      </button>
      {feedback === 'success' && <span style={{ color: '#38a169', fontSize: '1.2rem' }}>✓</span>}
      {feedback === 'error'   && <span style={{ color: '#e53e3e', fontSize: '1.2rem' }}>✗</span>}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'opacity 0.15s',
  },
};
