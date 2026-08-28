import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Padel Club Constitucion',
  description:
    'Canchas profesionales de padel, clases, torneos y reservas en Quivolgo, Constitucion.',
  openGraph: {
    title: 'Padel Club Constitucion',
    description:
      '4 canchas profesionales, clases para todos los niveles y reservas por WhatsApp en Quivolgo.',
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
      <body>{children}</body>
    </html>
  );
}
