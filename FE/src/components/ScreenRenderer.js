import ComponentRenderer from './ComponentRenderer';

export default function ScreenRenderer({ safeSchema }) {
  const { theme = {}, body = [] } = safeSchema;

  const screenStyle = {
    '--primary-color':    theme.primaryColor    || '#0070f3',
    '--background-color': theme.backgroundColor || '#f5f5f5',
    '--text-color':       theme.textColor       || '#1a1a1a',
    background: 'var(--background-color)',
    color:      'var(--text-color)',
    minHeight:  '100vh',
    width:      '100%',
  };

  return (
    <div style={screenStyle}>
      {body.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}
