export default function TextBlock({ component }) {
  return (
    <p style={styles.text}>{component.value}</p>
  );
}

const styles = {
  text: {
    margin: 0,
    background: '#fff',
    padding: '12px 16px',
    borderRadius: 8,
    lineHeight: 1.6,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    color: 'var(--text-color, #1a1a1a)',
  },
};
