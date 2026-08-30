import BookingSection from './components/BookingSection';
import ClassesSection from './components/ClassesSection';
import MobileBottomNav from './components/MobileBottomNav';
import Image from 'next/image';
import Link from 'next/link';

const mapsUrl =
  'https://www.google.com/maps/place/Padel+Club+Constituci%C3%B3n/@-35.3257861,-72.3890019,16z/data=!4m16!1m7!3m6!1s0x96665f3ae3c55b31:0xa907f4908e75a3c2!2sQuivolgo+Padel!8m2!3d-35.3250205!4d-72.3863049!16s%2Fg%2F11s43320k9!3m7!1s0x96665f08a7a7dffb:0xb3ce5b950fc1766!8m2!3d-35.325771!4d-72.385773!9m1!1b1!16s%2Fg%2F11trx3wt8s?entry=ttu';

const instagramUrl = 'https://www.instagram.com/padelclubconstitucion';
const whatsappBase = 'https://wa.me/56977333908';
const bookingWhatsapp = `${whatsappBase}?text=${encodeURIComponent('Hola Padel Club Constitucion, quiero reservar una cancha.')}`;

const galleryImages = [
  { label: 'Vista aerea', image: '/club-aerial-grid.png', alt: 'Vista aerea de las cuatro canchas de Padel Club Constitucion' },
  { label: 'Canchas', image: '/club-night-wide.png', alt: 'Canchas iluminadas de Padel Club Constitucion durante la noche' },
  { label: 'Juego nocturno', image: '/club-net-night.png', alt: 'Cancha de padel iluminada vista desde la red' },
  { label: 'Instalaciones', image: '/club-canopy-night.png', alt: 'Canchas del club con toldo superior durante la noche' },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Padel Club Constitucion">
          <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
          <span>Padel Club Constituci&oacute;n</span>
        </a>

        <nav className="nav-links" aria-label="Secciones principales">
          <a href="#inicio">Inicio</a>
          <a href="#reservar">Reservar</a>
          <a href="#canchas">Canchas</a>
          <a href="#clases">Clases</a>
          <a href="#comunidad">Comunidad</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="header-actions">
          <span className="header-safe">
            <i className="bi bi-shield-check" aria-hidden="true" />
            Tus datos se utilizar&aacute;n &uacute;nicamente para gestionar la reserva
          </span>
          <a className="header-cta" href="#reservar">
            Reservar cancha
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu">
            <i className="bi bi-list" aria-hidden="true" />
          </summary>
          <nav aria-label="Menu movil">
            <a href="#inicio">Inicio</a>
            <a href="#reservar">Reservar</a>
            <a href="#canchas">Canchas</a>
            <a href="#clases">Clases</a>
            <a href="#comunidad">Comunidad</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </details>
      </header>

      <MobileBottomNav />

      <section id="inicio" className="hero">
        <Image
          className="hero-bg"
          src="/club-aerial-main.png"
          alt="Vista aerea real de las canchas de Padel Club Constitucion"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Padel Club Constituci&oacute;n</p>
          <h1>
            Tu cancha.
            <span>Tu partido.</span>
            <span>Tu club.</span>
          </h1>
          <p className="hero-copy">
            4 canchas de p&aacute;del en Constituci&oacute;n para jugar, entrenar y competir.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#reservar">
              Reservar cancha
            </a>
            <a className="secondary-btn" href="#canchas">
              Conocer el club
            </a>
          </div>
          <dl className="hero-facts" aria-label="Datos del club">
            <div>
              <dt>4</dt>
              <dd>canchas</dd>
            </div>
            <div>
              <dt>Todos los d&iacute;as</dt>
              <dd>abierto</dd>
            </div>
            <div>
              <dt>10:00 - 23:00</dt>
              <dd>hrs</dd>
            </div>
          </dl>
        </div>
      </section>

      <BookingSection />

      <section id="canchas" className="club-section">
        <div className="club-copy">
          <p className="eyebrow">Conoce el club</p>
          <h2>Un espacio hecho para jugar</h2>
          <p>
            Cuatro canchas, iluminaci&oacute;n para disfrutar cada partido y un ambiente pensado para
            vivir el p&aacute;del en Constituci&oacute;n.
          </p>
        </div>
        <div className="club-gallery">
          <figure className="gallery-main">
            <Image
              src="/club-aerial-grid.png"
              alt="Vista aerea de las cuatro canchas del club"
              fill
              sizes="(max-width: 1040px) 100vw, 60vw"
            />
            <figcaption>Vista a&eacute;rea</figcaption>
          </figure>
          <div className="gallery-side">
            {galleryImages.slice(1).map((item) => (
              <figure key={item.label}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1040px) 100vw, 36vw" />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ClassesSection />

      <section id="comunidad" className="community-section">
        <div className="community-photo">
          <Image
            src="/club-sign-day.png"
            alt="Cartel de Padel Club Constitucion durante el dia"
            width={1033}
            height={1485}
            sizes="(max-width: 1040px) 100vw, 44vw"
          />
        </div>
        <div className="community-copy">
          <p className="eyebrow">Comunidad</p>
          <h2>El p&aacute;del tambi&eacute;n se vive fuera del partido</h2>
          <p>Torneos, encuentros y actividades del club en un solo lugar.</p>
          <article className="empty-event">
            <span>Pr&oacute;ximos eventos</span>
            <p>Muy pronto podr&aacute;s revisar aqu&iacute; fechas, categor&iacute;as e inscripciones.</p>
          </article>
          <a className="secondary-btn" href={instagramUrl} target="_blank" rel="noreferrer">
            Ver novedades en Instagram
          </a>
        </div>
      </section>

      <section id="contacto" className="location-section">
        <div className="location-copy">
          <p className="eyebrow">Ubicaci&oacute;n y contacto</p>
          <h2>Encu&eacute;ntranos en Constituci&oacute;n</h2>
          <div className="contact-list">
            <p>
              <strong>Padel Club Constituci&oacute;n</strong>
              Constituci&oacute;n, Regi&oacute;n del Maule
            </p>
            <p>
              <strong>Todos los d&iacute;as</strong>
              10:00 - 23:00 hrs
            </p>
            <p>
              <strong>+56 9 7733 3908</strong>
              @padelclubconstitucion
            </p>
          </div>
          <div className="contact-buttons">
            <a className="primary-btn" href={mapsUrl} target="_blank" rel="noreferrer">
              C&oacute;mo llegar
            </a>
            <a className="secondary-btn" href={bookingWhatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="secondary-btn" href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <a className="map-panel" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir ubicacion en Google Maps">
          <Image
            src="/club-aerial-main.png"
            alt="Vista aerea del recinto de Padel Club Constitucion"
            fill
            sizes="(max-width: 1040px) 100vw, 50vw"
          />
          <span>Ver en Google Maps</span>
        </a>
      </section>

      <section className="final-cta">
        <Image
          src="/club-night-angle.png"
          alt="Cancha iluminada de Padel Club Constitucion"
          fill
          sizes="100vw"
        />
        <div>
          <h2>&iquest;Jugamos?</h2>
          <p>Revisa los horarios disponibles y reserva tu pr&oacute;xima cancha.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#reservar">
              Ver disponibilidad
            </a>
            <a className="secondary-btn" href={bookingWhatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          <Image src="/logo-padel-club.png" alt="" width={100} height={100} />
          <span>Padel Club Constituci&oacute;n</span>
        </a>
        <p>
          Padel Club Constituci&oacute;n
          <br />
          Constituci&oacute;n, Regi&oacute;n del Maule
        </p>
        <nav aria-label="Enlaces de contacto">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a href={bookingWhatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={mapsUrl} target="_blank" rel="noreferrer">Google Maps</a>
        </nav>
        <small>&copy; {year} Padel Club Constituci&oacute;n.</small>
      </footer>
    </main>
  );
}
