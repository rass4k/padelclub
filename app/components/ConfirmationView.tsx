'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const whatsappNumber = '56977333908';
const reservationStorageKey = 'padel-club-confirmed-reservation';

type StoredReservation = {
  court: string;
  dateIso: string;
  fullDate: string;
  hour: string;
  endHour: string;
  name: string;
  rut: string;
  phone: string;
};

const fallbackReservation: StoredReservation = {
  court: 'Cancha 3',
  dateIso: new Date().toISOString(),
  fullDate: 'Jueves 28 de agosto',
  hour: '20:00',
  endHour: '21:00',
  name: 'Rodrigo Tomas Cancino',
  rut: '12.345.678-5',
  phone: '+56 9 1234 5678',
};

function formatCalendarDate(dateIso: string, hour: string) {
  const eventDate = new Date(dateIso);
  eventDate.setHours(Number(hour.slice(0, 2)), 0, 0, 0);
  return eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export default function ConfirmationView() {
  const [reservation, setReservation] = useState<StoredReservation>(fallbackReservation);

  useEffect(() => {
    const stored = window.localStorage.getItem(reservationStorageKey);
    if (!stored) return;

    const frame = window.requestAnimationFrame(() => {
      try {
        setReservation({ ...fallbackReservation, ...JSON.parse(stored) });
      } catch {
        window.localStorage.removeItem(reservationStorageKey);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function backToReserve() {
    window.location.assign('/#reservar');
  }

  function returnHome() {
    window.location.assign('/#inicio');
  }

  function downloadCalendarEvent() {
    const start = formatCalendarDate(reservation.dateIso, reservation.hour);
    const end = formatCalendarDate(reservation.dateIso, reservation.endHour);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Padel Club Constitucion//Reservas//ES',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@padelclubconstitucion.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Reserva ${reservation.court} - Padel Club Constitucion`,
      'LOCATION:Padel Club Constitucion, Constitucion, Region del Maule',
      `DESCRIPTION:Reserva a nombre de ${reservation.name}. RUT ${reservation.rut}. WhatsApp ${reservation.phone}.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reserva-padel-club-constitucion.ics';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="booking-section confirmed-booking-section" aria-label="Reserva confirmada">
      <div className="confirmation-desktop-topbar">
        <Link className="brand" href="/#inicio" aria-label="Padel Club Constitucion">
          <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
          <span>Padel Club Constituci&oacute;n</span>
        </Link>
        <nav className="booking-desktop-nav" aria-label="Navegaci&oacute;n de reservas">
          <button type="button" onClick={backToReserve}>
            <i className="bi bi-calendar-event" aria-hidden="true" />
            Reservas
          </button>
          <Link className="active" href="/confirmacion">
            <span className="padel-court-icon nav-court-icon" aria-hidden="true" />
            Mis reservas
          </Link>
          <Link href="/#comunidad">
            <i className="bi bi-people" aria-hidden="true" />
            Club
          </Link>
          <Link href="/#contacto">
            <i className="bi bi-envelope" aria-hidden="true" />
            Contacto
          </Link>
        </nav>
      </div>

      <div className="confirmation-mobile-header">
        <button type="button" aria-label="Volver a reservar" onClick={backToReserve}>
          <i className="bi bi-chevron-left" aria-hidden="true" />
        </button>
        <Link className="brand" href="/#inicio" aria-label="Padel Club Constitucion">
          <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
          <span>Padel Club Constituci&oacute;n</span>
        </Link>
        <a className="help-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          <span aria-hidden="true"><i className="bi bi-question-lg" /></span>
          &iquest;Dudas?
        </a>
      </div>

      <div className="confirmation-screen">
        <article className="confirmation-card">
          <div className="confirmation-status">
            <div className="success-mark" aria-hidden="true"><i className="bi bi-check-lg" /></div>
            <h1>&iexcl;Reserva confirmada!</h1>
            <p>Tu cancha ha quedado reservada.</p>
          </div>

          <div className="confirmation-summary">
            <div className="confirmation-photo">
              <Image
                src="/club-night-wide.png"
                alt="Cancha reservada iluminada"
                fill
                sizes="(max-width: 720px) 42vw, 480px"
              />
            </div>
            <div>
              <h2>{reservation.court}</h2>
              <p><i className="bi bi-calendar-event summary-icon" aria-hidden="true" />{reservation.fullDate}</p>
              <time><i className="bi bi-clock summary-icon" aria-hidden="true" />{reservation.hour} - {reservation.endHour}</time>
              <p><i className="bi bi-tag summary-icon" aria-hidden="true" />Duraci&oacute;n: 1 hora</p>
            </div>
          </div>

          <div className="confirmed-person">
            <h3>Reserva a nombre de</h3>
            <dl>
              <div>
                <dt><i className="bi bi-person field-icon" aria-hidden="true" /><span>Nombre</span></dt>
                <dd>{reservation.name}</dd>
              </div>
              <div>
                <dt><i className="bi bi-card-text field-icon" aria-hidden="true" /><span>RUT</span></dt>
                <dd>{reservation.rut}</dd>
              </div>
              <div>
                <dt><i className="bi bi-whatsapp field-icon" aria-hidden="true" /><span>WhatsApp</span></dt>
                <dd>{reservation.phone}</dd>
              </div>
            </dl>
          </div>

          <div className="reminder-card">
            <span className="reminder-icon" aria-hidden="true"><i className="bi bi-bell" /></span>
            <div>
              <strong>Te enviaremos un recordatorio</strong>
              <p>Un mensaje de confirmaci&oacute;n llegar&aacute; a tu WhatsApp.</p>
            </div>
          </div>

          <button className="calendar-action" onClick={downloadCalendarEvent} type="button">
            <i className="bi bi-calendar-plus summary-icon" aria-hidden="true" />
            Agregar a mi calendario
            <i className="bi bi-chevron-right action-arrow" aria-hidden="true" />
          </button>

          <div className="important-card">
            <span className="info-icon" aria-hidden="true"><i className="bi bi-info-lg" /></span>
            <div className="important-card-content">
              <strong>Importante</strong>
              <p>
                Presenta tu reserva el d&iacute;a de tu juego. Si necesitas cancelar o reprogramar,
                hazlo con <b>al menos 2 horas</b> de anticipaci&oacute;n.
              </p>
            </div>
          </div>

          <button className="return-home-btn" onClick={returnHome} type="button">
            <i className="bi bi-house" aria-hidden="true" />
            Volver al inicio
          </button>
          <button className="view-reservations-btn" type="button">
            Ver mis reservas
          </button>
        </article>
      </div>

      <nav className="confirmation-bottom-nav" aria-label="Navegaci&oacute;n de reserva">
        <Link href="/#inicio"><i className="bi bi-house" aria-hidden="true" />Inicio</Link>
        <button type="button" onClick={backToReserve}><i className="bi bi-calendar-check" aria-hidden="true" />Reservar</button>
        <Link className="active" href="/confirmacion"><span className="padel-court-icon nav-court-icon" aria-hidden="true" />Mis reservas</Link>
        <Link href="/#comunidad"><i className="bi bi-people" aria-hidden="true" />Club</Link>
        <Link href="/#contacto"><i className="bi bi-person-circle" aria-hidden="true" />Perfil</Link>
      </nav>
    </section>
  );
}
