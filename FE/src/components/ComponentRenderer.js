import HtmlBlock from './blocks/HtmlBlock';

export default function ComponentRenderer({ component, height }) {
  if (!component || !component.type) return null;

  switch (component.type) {
    case 'html':
      return <HtmlBlock html={component.html} height={height} />;
    default:
      console.warn(`[ComponentRenderer] Unknown type: "${component.type}"`);
      return null;
  }
}