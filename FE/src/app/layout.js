import '../styles/globals.css';

export const metadata = {
  title: 'Config App',
  description: 'Dynamic config-driven application',
  manifest: '/manifest.json',
  themeColor: '#0070f3',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Config App',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Config App" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
