export default function TableBlock({ component }) {
  const { columns = [], data = [] } = component;

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={styles.th}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri}>
              {Array.isArray(row)
                ? row.map((cell, ci) => (
                    <td key={ci} style={styles.td}>{cell}</td>
                  ))
                : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    overflowX: 'auto',
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    fontSize: '0.9rem',
  },
  th: {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#f7fafc',
    fontWeight: 700,
    borderBottom: '1px solid #e2e8f0',
    color: 'var(--text-color, #1a1a1a)',
  },
  td: {
    padding: '10px 14px',
    textAlign: 'left',
    borderBottom: '1px solid #e2e8f0',
    color: 'var(--text-color, #1a1a1a)',
  },
};
