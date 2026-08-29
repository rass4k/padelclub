import type { Metadata } from 'next';
import ConfirmationView from '../components/ConfirmationView';

export const metadata: Metadata = {
  title: 'Reserva confirmada | Padel Club Constituci\u00f3n',
  description: 'Detalle de la reserva confirmada en Padel Club Constituci\u00f3n.',
};

export default function ConfirmationPage() {
  return (
    <main className="confirmation-page-main">
      <ConfirmationView />
    </main>
  );
}
