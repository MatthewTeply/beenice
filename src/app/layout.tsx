import type { Metadata } from 'next';
import Header from '../components/partials/header';

export const metadata: Metadata = {
  title: 'Beenice',
  description: 'Be(e) nice to others.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
