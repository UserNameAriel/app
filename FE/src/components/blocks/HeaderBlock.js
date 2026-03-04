export default function HeaderBlock({ component }) {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>{component.title}</h2>
    </div>
  );
}

const styles = {
  wrapper: {
    background: '#fff',
    borderLeft: '4px solid var(--primary-color, #0070f3)',
    padding: '12px 16px',
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    color: 'var(--text-color, #1a1a1a)',
  },
};
