'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import CourtSelector, { type CourtNumber } from './CourtSelector';

const whatsappNumber = '56977333908';
const reservationStorageKey = 'padel-club-confirmed-reservation';
const bookingHours = ['18:00', '19:00', '20:00', '21:00', '22:00'];
const courtNumbers = [1, 2, 3, 4] as const;
const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const weekdayNames = ['Domingo', 'Lunes', 'Martes', 'Mi\u00e9rcoles', 'Jueves', 'Viernes', 'S\u00e1bado'];

type ConfirmedReservation = {
  court: string;
  date: Date;
  fullDate: string;
  hour: string;
  endHour: string;
  name: string;
  rut: string;
  phone: string;
};

type BookingDay = {
  date: Date;
  label: string;
  shortLabel: string;
  dayNumber: number;
  month: string;
  fullDate: string;
};

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function formatDay(date: Date, index: number) {
  if (index === 0) return `Hoy, ${date.getDate()} ${monthNames[date.getMonth()]}`;
  if (index === 1) return `Ma\u00f1ana, ${date.getDate()} ${monthNames[date.getMonth()]}`;
  return weekdayNames[date.getDay()];
}

function formatShortDay(date: Date, index: number) {
  if (index === 0) return 'Hoy';
  if (index === 1) return 'Ma\u00f1ana';
  return weekdayNames[date.getDay()];
}

function formatFullDate(date: Date) {
  return `${weekdayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()].toLowerCase()}`;
}

function formatCalendarDate(date: Date, hour: string) {
  const eventDate = new Date(date);
  eventDate.setHours(Number(hour.slice(0, 2)), 0, 0, 0);
  return eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function getReservedSlots(dayIndex: number) {
  const reservedByDay = [
    ['18:00-Cancha 2', '19:00-Cancha 3', '20:00-Cancha 1', '21:00-Cancha 4', '22:00-Cancha 2'],
    ['18:00-Cancha 1', '19:00-Cancha 4', '21:00-Cancha 2'],
    ['18:00-Cancha 3', '20:00-Cancha 2', '21:00-Cancha 4', '22:00-Cancha 1'],
    ['19:00-Cancha 1', '20:00-Cancha 3', '22:00-Cancha 4'],
  ];

  return new Set(reservedByDay[dayIndex] ?? []);
}

export default function BookingSection() {
  const [dayIndex, setDayIndex] = useState(0);
  const [activeCourt, setActiveCourt] = useState<CourtNumber>(3);
  const [selectedHour, setSelectedHour] = useState('20:00');
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);

  const days = useMemo<BookingDay[]>(() => {
    const today = new Date();
    return Array.from({ length: 4 }, (_, index) => {
      const date = addDays(today, index);
      return {
        date,
        label: formatDay(date, index),
        shortLabel: formatShortDay(date, index),
        dayNumber: date.getDate(),
        month: monthNames[date.getMonth()],
        fullDate: formatFullDate(date),
      };
    });
  }, []);

  const reservedSlots = useMemo(() => getReservedSlots(dayIndex), [dayIndex]);
  const selectedCourt = `Cancha ${activeCourt}`;
  const selectedEndHour = selectedHour ? `${Number(selectedHour.slice(0, 2)) + 1}:00` : '';
  const selectedFullDate = days[dayIndex]?.fullDate ?? 'Hoy';
  const selectedSlotKey = selectedHour ? `${selectedHour}-${selectedCourt}` : '';
  const availableSlots = bookingHours.filter((hour) => !reservedSlots.has(`${hour}-${selectedCourt}`)).length;

  useEffect(() => {
    if (!modalOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setModalOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [modalOpen]);

  useEffect(() => {
    if (!confirmedReservation) return;

    window.setTimeout(() => {
      document.getElementById('reservar')?.scrollIntoView({ block: 'start' });
    }, 0);
  }, [confirmedReservation]);

  function selectDay(nextIndex: number) {
    const boundedIndex = (nextIndex + days.length) % days.length;

    setDayIndex(boundedIndex);
    setSelectedHour('');
    setFeedback('');
  }

  function selectCourt(court: CourtNumber) {
    setActiveCourt(court);
    setSelectedHour('');
    setFeedback('');
  }

  function selectSlot(hour: string, court = activeCourt) {
    const courtName = `Cancha ${court}`;
    const slotKey = `${hour}-${courtName}`;
    if (reservedSlots.has(slotKey)) return;

    setActiveCourt(court);
    setSelectedHour(hour);
    setFeedback('');
    setModalOpen(true);
  }

  function openReservationDetails() {
    if (!selectedHour) return;
    setFeedback('');
    setModalOpen(true);
  }

  function continueReservation() {
    if (!name.trim()) {
      setFeedback('Ingresa tu nombre para continuar.');
      return;
    }

    if (!rut.trim()) {
      setFeedback('Ingresa tu RUT para continuar.');
      return;
    }

    if (!phone.trim()) {
      setFeedback('Ingresa tu telefono o WhatsApp.');
      return;
    }

    const reservation = {
      court: selectedCourt,
      dateIso: (days[dayIndex]?.date ?? new Date()).toISOString(),
      fullDate: selectedFullDate,
      hour: selectedHour,
      endHour: selectedEndHour,
      name: name.trim(),
      rut: rut.trim(),
      phone: phone.trim(),
    };

    window.localStorage.setItem(reservationStorageKey, JSON.stringify(reservation));
    setModalOpen(false);
    setFeedback('');
    window.location.assign('/confirmacion');
  }

  function downloadCalendarEvent() {
    if (!confirmedReservation) return;

    const start = formatCalendarDate(confirmedReservation.date, confirmedReservation.hour);
    const end = formatCalendarDate(confirmedReservation.date, confirmedReservation.endHour);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Padel Club Constitucion//Reservas//ES',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@padelclubconstitucion.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Reserva ${confirmedReservation.court} - Padel Club Constitucion`,
      'LOCATION:Padel Club Constitucion, Constitucion, Region del Maule',
      `DESCRIPTION:Reserva a nombre de ${confirmedReservation.name}. RUT ${confirmedReservation.rut}. WhatsApp ${confirmedReservation.phone}.`,
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

  function returnHome() {
    setConfirmedReservation(null);
    setSelectedHour('');
    setFeedback('');
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
  }

  if (confirmedReservation) {
    return (
      <section id="reservar" className="booking-section confirmed-booking-section" aria-label="Reserva confirmada">
        <div className="confirmation-desktop-topbar">
          <a className="brand" href="#inicio" aria-label="Padel Club Constitucion">
            <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
            <span>Padel Club Constituci&oacute;n</span>
          </a>
          <nav className="booking-desktop-nav" aria-label="Navegaci&oacute;n de reservas">
            <button type="button" onClick={() => setConfirmedReservation(null)}>
              <i className="bi bi-calendar-event" aria-hidden="true" />
              Reservas
            </button>
            <a className="active" href="#reservar">
              <span className="padel-court-icon nav-court-icon" aria-hidden="true" />
              Mis reservas
            </a>
            <a href="#comunidad">
              <i className="bi bi-people" aria-hidden="true" />
              Club
            </a>
            <a href="#contacto">
              <i className="bi bi-envelope" aria-hidden="true" />
              Contacto
            </a>
          </nav>
        </div>

        <div className="confirmation-mobile-header">
          <button type="button" aria-label="Volver a reservar" onClick={() => setConfirmedReservation(null)}>
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <a className="brand" href="#inicio" aria-label="Padel Club Constitucion">
            <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
            <span>Padel Club Constituci&oacute;n</span>
          </a>
          <a className="help-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            <span aria-hidden="true"><i className="bi bi-question-lg" /></span>
            &iquest;Dudas?
          </a>
        </div>

        <div className="confirmation-screen">
          <article className="confirmation-card">
            <div className="confirmation-status">
              <div className="success-mark" aria-hidden="true"><i className="bi bi-check-lg" /></div>
              <h2>&iexcl;Reserva confirmada!</h2>
              <p>Tu cancha ha quedado reservada.</p>
            </div>

            <div className="confirmation-summary">
              <div className="confirmation-photo">
                <Image
                  src="/club-night-wide.png"
                  alt="Cancha reservada iluminada"
                  fill
                  sizes="(max-width: 720px) 42vw, 280px"
                />
              </div>
              <div>
                <h3>{confirmedReservation.court}</h3>
                <p><i className="bi bi-calendar-event summary-icon" aria-hidden="true" />{confirmedReservation.fullDate}</p>
                <time><i className="bi bi-clock summary-icon" aria-hidden="true" />{confirmedReservation.hour} - {confirmedReservation.endHour}</time>
                <p><i className="bi bi-tag summary-icon" aria-hidden="true" />Duraci&oacute;n: 1 hora</p>
              </div>
            </div>

            <div className="confirmed-person">
              <h4>Reserva a nombre de</h4>
              <dl>
                <div>
                  <dt><i className="bi bi-person field-icon" aria-hidden="true" /><span>Nombre</span></dt>
                  <dd>{confirmedReservation.name}</dd>
                </div>
                <div>
                  <dt><i className="bi bi-card-text field-icon" aria-hidden="true" /><span>RUT</span></dt>
                  <dd>{confirmedReservation.rut}</dd>
                </div>
                <div>
                  <dt><i className="bi bi-whatsapp field-icon" aria-hidden="true" /><span>WhatsApp</span></dt>
                  <dd>{confirmedReservation.phone}</dd>
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
          <a href="#inicio"><i className="bi bi-house" aria-hidden="true" />Inicio</a>
          <button type="button" onClick={() => setConfirmedReservation(null)}><i className="bi bi-calendar-check" aria-hidden="true" />Reservar</button>
          <a className="active" href="#reservar"><span className="padel-court-icon nav-court-icon" aria-hidden="true" />Mis reservas</a>
          <a href="#comunidad"><i className="bi bi-people" aria-hidden="true" />Club</a>
          <a href="#contacto"><i className="bi bi-person-circle" aria-hidden="true" />Perfil</a>
        </nav>
      </section>
    );
  }

  return (
    <section id="reservar" className="booking-section" aria-label="Reservar cancha">
      <div className="booking-desktop-topbar">
        <a className="brand" href="#inicio" aria-label="Padel Club Constitucion">
          <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
          <span>Padel Club Constituci&oacute;n</span>
        </a>
        <nav className="booking-desktop-nav" aria-label="Navegaci&oacute;n de reservas">
          <a className="active" href="#reservar">Reservas</a>
          <a href="#reservar">Mis reservas</a>
          <a href="#clases">Tarifas</a>
          <a href="#comunidad">Club</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="booking-desktop-actions">
          <button type="button" aria-label="Notificaciones">
            <i className="bi bi-bell" aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <a className="booking-user-pill" href="#reservar">
            <i className="bi bi-person-circle" aria-hidden="true" />
            Hola, Rodrigo
            <i className="bi bi-chevron-down" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="booking-hero">
        <Image
          src="/club-night-angle.png"
          alt="Cancha de padel iluminada para reservar"
          fill
          sizes="100vw"
        />
        <div>
          <p className="eyebrow">Padel Club Constituci&oacute;n</p>
          <h2>
            Elige un
            <span> horario</span>
          </h2>
          <p>Las 4 canchas aparecen autom&aacute;ticamente.</p>
        </div>
      </div>

      <div className="booking-board">
        <div className="day-tabs" aria-label="Dias disponibles">
          <button type="button" aria-label="Dia anterior" onClick={() => selectDay(dayIndex - 1)}>
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          {days.map((day, index) => (
            <button
              aria-pressed={dayIndex === index}
              className={dayIndex === index ? 'active' : ''}
              key={day.fullDate}
              onClick={() => selectDay(index)}
              type="button"
            >
              <span className="day-main">{day.shortLabel}</span>
              <span className="day-date">{day.dayNumber} {day.month}</span>
            </button>
          ))}
          <button type="button" aria-label="Dia siguiente" onClick={() => selectDay(dayIndex + 1)}>
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>

        <p className="demo-note">Disponibilidad demostrativa hasta conectar el sistema real de reservas.</p>

        <div className="mobile-reserve-flow">
          <div className="mobile-status-legend" aria-label="Leyenda de disponibilidad">
            <span><i className="dot available-dot" />Disponible</span>
            <span><i className="dot occupied-dot" />Ocupada</span>
          </div>

          <div className="mobile-schedule-grid" aria-label="Horarios disponibles por cancha">
            <strong>Hora</strong>
            {courtNumbers.map((court) => (
              <strong key={court}>C{court}</strong>
            ))}

            {bookingHours.map((hour) => (
              <div className="mobile-schedule-row" key={hour}>
                <time>{hour}</time>
                {courtNumbers.map((court) => {
                  const courtName = `Cancha ${court}`;
                  const slotKey = `${hour}-${courtName}`;
                  const isReserved = reservedSlots.has(slotKey);
                  const isSelected = slotKey === selectedSlotKey;

                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`mobile-schedule-slot ${isReserved ? 'reserved' : 'available'} ${isSelected ? 'selected' : ''}`}
                      disabled={isReserved}
                      key={slotKey}
                      onClick={() => selectSlot(hour, court)}
                      type="button"
                    >
                      <span className="slot-dot" aria-hidden="true" />
                      <span>{isReserved ? 'Ocupada' : 'Libre'}</span>
                      {isSelected && <i className="bi bi-check-lg" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="mobile-update-note">Los horarios se actualizan en tiempo real.</p>
        </div>

        <div className="booking-picker">
          <div className="court-picker-panel">
            <div className="picker-heading">
              <span>1. Selecciona una cancha</span>
              <p>El mapa muestra la distribuci&oacute;n de las 4 canchas del club.</p>
            </div>
            <CourtSelector selectedCourt={activeCourt} onSelect={selectCourt} />
          </div>

          <div className="time-picker-panel">
            <div className="picker-heading">
              <span>2. Elige un horario</span>
              <p>
                {selectedCourt} tiene {availableSlots} horarios disponibles para {selectedFullDate}.
              </p>
            </div>
            <div className="mobile-hour-list" aria-label={`Horarios disponibles para ${selectedCourt}`}>
              {bookingHours.map((hour) => {
                const slotKey = `${hour}-${selectedCourt}`;
                const isReserved = reservedSlots.has(slotKey);
                const isSelected = slotKey === selectedSlotKey;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`mobile-hour ${isReserved ? 'reserved' : 'available'} ${isSelected ? 'selected' : ''}`}
                    disabled={isReserved}
                    key={slotKey}
                    onClick={() => selectSlot(hour)}
                    type="button"
                  >
                    <time>{hour}</time>
                    <span>{isReserved ? 'Reservada' : 'Disponible'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="booking-legend">
          <span><i className="dot available-dot" />Disponible</span>
          <span><i className="dot occupied-dot" />Ocupada</span>
        </div>

        {selectedHour && (
          <aside className="mobile-reservation-card" aria-labelledby="mobile-reservation-title">
            <h3 id="mobile-reservation-title">
              <span className="desktop-selection-label">Tu selecci&oacute;n</span>
              <span className="mobile-selection-label">Tu reserva</span>
            </h3>
            <div className="mobile-reservation-grid">
              <div className="mobile-reservation-summary">
                <span className="padel-court-icon mobile-mini-court" aria-hidden="true" />
                <div>
                  <strong>{selectedCourt}</strong>
                  <span>{selectedFullDate}</span>
                  <time>{selectedHour} - {selectedEndHour}</time>
                </div>
              </div>
              <button className="change-reservation" onClick={() => setSelectedHour('')} type="button">
                <span className="desktop-change-label">Cambiar selecci&oacute;n</span>
                <span className="mobile-change-label">Cambiar</span>
                <i className="bi bi-pencil" aria-hidden="true" />
              </button>
            </div>
            <button className="booking-submit" onClick={openReservationDetails} type="button">
              Continuar
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
            <small>{feedback || 'Tus datos se usan solo para coordinar esta reserva.'}</small>
          </aside>
        )}

        <div className="booking-support-strip">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            <span><i className="bi bi-question-lg" aria-hidden="true" /></span>
            <strong>&iquest;Dudas?</strong>
            Cont&aacute;ctanos por WhatsApp
          </a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            <span><i className="bi bi-whatsapp" aria-hidden="true" /></span>
            <strong>+56 9 7733 3908</strong>
            Atenci&oacute;n de 9:00 a 22:00
          </a>
        </div>
      </div>

      {modalOpen && (
        <div className="reservation-modal" onClick={() => setModalOpen(false)} role="presentation">
          <aside
            aria-labelledby="reservation-title"
            aria-modal="true"
            className="reservation-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Cerrar reserva"
              className="modal-close"
              onClick={() => setModalOpen(false)}
              type="button"
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
            <span className="modal-handle" aria-hidden="true" />
            <div className="reservation-top">
              <div className="reservation-photo">
                <Image
                  src="/club-night-wide.png"
                  alt="Cancha seleccionada iluminada"
                  fill
                  sizes="(max-width: 720px) 44vw, 170px"
                />
              </div>
              <div>
                <p className="eyebrow">Tu selecci&oacute;n</p>
                <h3 id="reservation-title">{selectedCourt}</h3>
                <div className="reservation-summary">
                  <p><i className="bi bi-calendar-event summary-icon" aria-hidden="true" />{selectedFullDate}</p>
                  <time><i className="bi bi-clock summary-icon" aria-hidden="true" />{selectedHour} - {selectedEndHour}</time>
                  <p><i className="bi bi-tag summary-icon" aria-hidden="true" />Duraci&oacute;n: 1 hora</p>
                </div>
              </div>
            </div>
            <form
              className="reservation-form"
              onSubmit={(event) => {
                event.preventDefault();
                continueReservation();
              }}
            >
              <h4>Reserva a nombre de</h4>
              <label className="field-full">
                <span className="field-label">Nombre completo</span>
                <span className="input-shell">
                  <i className="bi bi-person field-icon" aria-hidden="true" />
                  <input
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ej: Rodrigo Tomas Cancino"
                    value={name}
                  />
                </span>
              </label>
              <div className="form-row">
                <label>
                  <span className="field-label">RUT</span>
                  <span className="input-shell">
                    <i className="bi bi-card-text field-icon" aria-hidden="true" />
                    <input
                      autoComplete="off"
                      onChange={(event) => setRut(event.target.value)}
                      placeholder="12.345.678-5"
                      value={rut}
                    />
                  </span>
                </label>
                <label>
                  <span className="field-label">WhatsApp / Tel&eacute;fono</span>
                  <span className="input-shell">
                    <i className="bi bi-whatsapp field-icon" aria-hidden="true" />
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+56 9 1234 5678"
                      value={phone}
                    />
                  </span>
                </label>
              </div>
              <p className="reservation-note">
                <span className="info-icon" aria-hidden="true"><i className="bi bi-info-lg" /></span>
                La reserva quedar&aacute; registrada a este nombre.
              </p>
              <button className="booking-submit" type="submit">
                <i className="bi bi-lock-fill submit-icon" aria-hidden="true" />
                Confirmar reserva
              </button>
              <small>{feedback || 'Tus datos estan protegidos y no seran compartidos.'}</small>
            </form>
          </aside>
        </div>
      )}
    </section>
  );
}
