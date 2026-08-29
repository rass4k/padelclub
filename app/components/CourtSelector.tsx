'use client';

export type CourtNumber = 1 | 2 | 3 | 4;

type CourtSelectorProps = {
  selectedCourt: CourtNumber;
  onSelect: (court: CourtNumber) => void;
  className?: string;
};

const courts: { id: CourtNumber; x: number; y: number }[] = [
  { id: 1, x: 36, y: 28 },
  { id: 2, x: 214, y: 28 },
  { id: 3, x: 36, y: 232 },
  { id: 4, x: 214, y: 232 },
];

function MiniCourt() {
  return <span className="padel-court-icon mini-court-drawing" aria-hidden="true" />;
}

export default function CourtSelector({ selectedCourt, onSelect, className = '' }: CourtSelectorProps) {
  return (
    <div className={`court-selector ${className}`}>
      <svg
        viewBox="0 0 430 440"
        role="radiogroup"
        aria-label="Selecciona una cancha"
        className="court-map"
      >
        <defs>
          <filter id="selectedGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d="M203 25 V415" className="aisle" aria-hidden="true" />
        <path d="M227 25 V415" className="aisle" aria-hidden="true" />

        {courts.map(({ id, x, y }) => {
          const selected = selectedCourt === id;

          return (
            <g
              key={id}
              role="radio"
              aria-checked={selected}
              aria-label={`Cancha ${id}`}
              tabIndex={0}
              className={`court ${selected ? 'selected' : ''}`}
              transform={`translate(${x} ${y})`}
              onClick={() => onSelect(id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(id);
                }
              }}
            >
              <rect x="-12" y="-12" width="168" height="190" rx="16" className="hit-area" />

              <path d="M0 0 H140 L150 12 V168 H10 L0 156 Z" className="court-outline" />
              <rect x="10" y="12" width="130" height="144" className="court-floor" />

              <line x1="75" y1="12" x2="75" y2="156" className="court-line" />
              <line x1="10" y1="48" x2="140" y2="48" className="court-line" />
              <line x1="10" y1="120" x2="140" y2="120" className="court-line" />

              <line x1="5" y1="84" x2="145" y2="84" className="court-net" />
              <line x1="5" y1="80" x2="5" y2="88" className="net-post" />
              <line x1="145" y1="80" x2="145" y2="88" className="net-post" />

              <line x1="0" y1="28" x2="10" y2="36" className="court-detail" />
              <line x1="0" y1="48" x2="10" y2="56" className="court-detail" />
              <line x1="0" y1="120" x2="10" y2="128" className="court-detail" />
              <line x1="140" y1="36" x2="150" y2="28" className="court-detail" />
              <line x1="140" y1="56" x2="150" y2="48" className="court-detail" />
              <line x1="140" y1="128" x2="150" y2="120" className="court-detail" />

              <g className="court-label">
                <rect x="33" y="62" width="84" height="38" rx="19" />
                <text x="75" y="86" textAnchor="middle">
                  Cancha {id}
                </text>
              </g>

              {selected && <circle cx="128" cy="20" r="6" className="selected-dot" />}
            </g>
          );
        })}
      </svg>

      <div className="court-selector-footer" aria-live="polite">
        <span className="status-dot" />
        <span>
          Seleccionada: <strong>Cancha {selectedCourt}</strong>
        </span>
      </div>

      <div className="court-card-strip" role="radiogroup" aria-label="Selecciona una cancha">
        {courts.map(({ id }) => {
          const selected = selectedCourt === id;

          return (
            <button
              aria-checked={selected}
              className={`court-card-option ${selected ? 'selected' : ''}`}
              key={id}
              onClick={() => onSelect(id)}
              role="radio"
              type="button"
            >
              <span>Cancha {id}</span>
              <MiniCourt />
              {selected && <i className="bi bi-check-lg" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
