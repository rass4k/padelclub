import type { Metadata } from 'next';
import MotionEnhancer from './components/MotionEnhancer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Padel Club Constitución',
  description:
    '4 canchas de pádel, clases particulares y reservas en Constitución, Región del Maule.',
  openGraph: {
    title: 'Padel Club Constitución',
    description:
      '4 canchas de pádel, clases particulares y reservas por WhatsApp en Constitución.',
    images: ['/logo-padel-club.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <MotionEnhancer />
        {children}
      </body>
    </html>
  );
}
