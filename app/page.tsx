const mapsUrl =
  'https://www.google.com/maps/place/Padel+Club+Constituci%C3%B3n/@-35.3257861,-72.3890019,16z/data=!4m16!1m7!3m6!1s0x96665f3ae3c55b31:0xa907f4908e75a3c2!2sQuivolgo+Padel!8m2!3d-35.3250205!4d-72.3863049!16s%2Fg%2F11s43320k9!3m7!1s0x96665f08a7a7dffb:0xb3ce5b950fc1766!8m2!3d-35.325771!4d-72.385773!9m1!1b1!16s%2Fg%2F11trx3wt8s?entry=ttu';

const whatsappUrl =
  'https://wa.me/56977333908?text=Hola%20Padel%20Club%20Constituci%C3%B3n%2C%20quiero%20reservar%20una%20cancha.';

const courts = [
  { name: 'Cancha 1', image: '/court-1.png', detail: 'Iluminacion nocturna' },
  { name: 'Cancha 2', image: '/court-2.png', detail: 'Superficie profesional' },
  { name: 'Cancha 3', image: '/court-3.png', detail: 'Juego por hora' },
  { name: 'Cancha 4', image: '/court-4.png', detail: 'Prontamente techada' },
];

const classPacks = [
  { title: 'Clase individual', price: '$16.000', note: 'Entrenamiento tecnico personalizado' },
  { title: 'Pack 4 clases', price: '$56.000', note: 'Constancia semanal para subir nivel' },
  { title: 'Pack 8 clases', price: '$100.000', note: 'Plan mensual con seguimiento' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Padel Club Constitucion">
          <img src="/logo-padel-club.png" alt="" />
          <span>Padel Club Constitucion</span>
        </a>
        <nav className="nav-links" aria-label="Secciones principales">
          <a href="#canchas">Canchas</a>
          <a href="#clases">Clases</a>
          <a href="#torneos">Torneos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Reservar por WhatsApp
        </a>
      </header>

      <section id="inicio" className="hero">
        <img className="hero-bg" src="/hero-court.png" alt="Canchas de padel iluminadas de noche" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Club deportivo en Quivolgo, Constitucion</p>
          <h1>
            Padel Club
            <span>Constitucion</span>
          </h1>
          <p className="hero-copy">
            4 canchas profesionales de padel, clases para todos los niveles y una comunidad
            activa para jugar, entrenar y competir cerca del rio Maule.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
              Reservar cancha
            </a>
            <a className="secondary-btn" href="#clases">
              Ver clases
            </a>
          </div>
        </div>
        <div className="hero-badge" aria-label="Proximamente canchas techadas">
          <strong>Prontamente</strong>
          <span>canchas techadas</span>
        </div>
      </section>

      <section className="info-strip" aria-label="Datos rapidos del club">
        <article>
          <span>Horario</span>
          <strong>Todos los dias</strong>
          <p>10:00 a 23:00 hrs</p>
        </article>
        <article>
          <span>Ubicacion</span>
          <strong>Quivolgo</strong>
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            Ver en Google Maps
          </a>
        </article>
        <article>
          <span>Contacto</span>
          <strong>+56 9 7733 3908</strong>
          <p>DM o WhatsApp</p>
        </article>
        <article>
          <span>Instagram</span>
          <strong>@padelclubconstitucion</strong>
          <a href="https://www.instagram.com/padelclubconstitucion" target="_blank" rel="noreferrer">
            Ir al perfil
          </a>
        </article>
      </section>

      <section id="canchas" className="section courts-section">
        <div className="section-heading">
          <p className="eyebrow">Instalaciones</p>
          <h2>Nuestras canchas</h2>
          <p>
            Una vitrina directa para mostrar disponibilidad, fotos por cancha y llamados a
            reserva sin que el jugador tenga que buscar informacion.
          </p>
        </div>
        <div className="court-grid">
          {courts.map((court) => (
            <article className="court-card" key={court.name}>
              <img src={court.image} alt={`${court.name} de Padel Club Constitucion`} />
              <div>
                <strong>{court.name}</strong>
                <span>{court.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="clases" className="split-section">
        <div className="class-visual">
          <img src="/clases-padel.png" alt="Afiche de entrenamiento de padel" />
        </div>
        <div className="class-content">
          <p className="eyebrow">Entrenamientos</p>
          <h2>Lleva tu padel al siguiente nivel</h2>
          <p>
            Clases personalizadas con Gonzalo Rodriguez para principiantes, jugadores
            intermedios y quienes buscan competir con mas confianza.
          </p>
          <div className="pricing-list">
            {classPacks.map((pack) => (
              <article key={pack.title}>
                <div>
                  <strong>{pack.title}</strong>
                  <span>{pack.note}</span>
                </div>
                <b>{pack.price}</b>
              </article>
            ))}
          </div>
          <a className="primary-btn wide" href={whatsappUrl} target="_blank" rel="noreferrer">
            Consultar disponibilidad
          </a>
        </div>
      </section>

      <section id="torneos" className="section tournaments">
        <div className="section-heading">
          <p className="eyebrow">Comunidad</p>
          <h2>Torneos, ligas y eventos</h2>
          <p>
            La web puede funcionar como punto oficial para publicar cuadros, inscripciones,
            fechas y resultados del club.
          </p>
        </div>
        <div className="event-row">
          <article>
            <span>Americano mixto</span>
            <strong>Sabado 18:00 hrs</strong>
            <p>Cupos limitados por categoria.</p>
          </article>
          <article>
            <span>Ranking interno</span>
            <strong>Temporada mensual</strong>
            <p>Tabla visible para socios y jugadores frecuentes.</p>
          </article>
          <article>
            <span>Escuela formativa</span>
            <strong>Niños y adultos</strong>
            <p>Bloques horarios para nuevos jugadores.</p>
          </article>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div>
          <p className="eyebrow">Reserva facil</p>
          <h2>Todo listo para jugar en Constitucion</h2>
          <p>
            Una pagina asi permite centralizar reservas, precios, fotos, ubicacion y redes
            sociales en un solo enlace profesional para Instagram y WhatsApp.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            Escribir por WhatsApp
          </a>
          <a className="secondary-btn dark" href={mapsUrl} target="_blank" rel="noreferrer">
            Como llegar
          </a>
        </div>
      </section>
    </main>
  );
}
