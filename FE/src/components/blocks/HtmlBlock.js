'use client';

export default function HtmlBlock({ html, height }) {
  const srcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: system-ui, sans-serif;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      style={{
        width:      '100%',
        height:     height ? `${height}px` : '100%',
        border:     0,
        display:    'block',
        overflow:   'hidden',
        flexShrink: 0,
      }}
      scrolling="no"
    />
  );
}