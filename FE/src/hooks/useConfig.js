'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function useConfig(appId) {
  const [safeSchema, setSafeSchema] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  useEffect(() => {
    const url = appId
      ? `${API_BASE}/config?appId=${appId}`
      : `${API_BASE}/config`;

    fetch(url)
      .then(res => {
        if (!res.ok) return res.json().then(d => Promise.reject(d.message || 'Server error'));
        return res.json();
      })
      .then(data => {
        setSafeSchema(data.safeSchema);
        setLoading(false);
      })
      .catch(err => {
        setError(typeof err === 'string' ? err : 'Failed to load config');
        setLoading(false);
      });
  }, [appId]);

  return { safeSchema, loading, error };
}
