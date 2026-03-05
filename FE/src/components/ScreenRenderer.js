'use client';

import { useEffect, useState } from 'react';
import ComponentRenderer from './ComponentRenderer';

// Heights as % of viewport per block index: [header, content, footer]
const HEIGHT_RATIOS = [0.10, 0.83, 0.07];

export default function ScreenRenderer({ safeSchema }) {
  const { theme = {}, body = [] } = safeSchema;
  const [vh, setVh] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const screenStyle = {
    '--primary-color':    theme.primaryColor    || '#0070f3',
    '--background-color': theme.backgroundColor || '#f5f5f5',
    '--text-color':       theme.textColor       || '#1a1a1a',
    background: 'var(--background-color)',
    color:      'var(--text-color)',
    height:     '100vh',
    width:      '100%',
    display:    'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <div style={screenStyle}>
      {body.map((component, index) => {
        const ratio  = HEIGHT_RATIOS[index] ?? (1 / body.length);
        const height = vh > 0 ? Math.floor(vh * ratio) : undefined;
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            height={height}
          />
        );
      })}
    </div>
  );
}