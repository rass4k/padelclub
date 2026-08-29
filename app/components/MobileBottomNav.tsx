'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { id: 'inicio', label: 'Inicio', href: '#inicio', icon: <i className="bi bi-house" aria-hidden="true" /> },
  { id: 'reservar', label: 'Reservar', href: '#reservar', icon: <i className="bi bi-calendar-check" aria-hidden="true" /> },
  {
    id: 'canchas',
    label: 'Canchas',
    href: '#canchas',
    icon: <span className="padel-court-icon nav-court-icon" aria-hidden="true" />,
  },
  { id: 'comunidad', label: 'Club', href: '#comunidad', icon: <i className="bi bi-people" aria-hidden="true" /> },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: <i className="bi bi-telephone" aria-hidden="true" /> },
] as const;

type NavId = (typeof navItems)[number]['id'];

function getHashSection(): NavId | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const hash = window.location.hash.replace('#', '');
  const hashItem = navItems.find((item) => item.id === hash);

  return hashItem?.id ?? null;
}

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState<NavId>('inicio');

  useEffect(() => {
    const setFromHash = () => {
      const hashSection = getHashSection();

      if (hashSection) {
        setActiveSection(hashSection);
      }
    };

    setFromHash();
    window.addEventListener('hashchange', setFromHash);

    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as NavId);
        }
      },
      {
        rootMargin: '-38% 0px -52% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('hashchange', setFromHash);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegaci&oacute;n m&oacute;vil">
      {navItems.map((item) => {
        const isActive = item.id === activeSection;

        return (
          <a
            aria-current={isActive ? 'page' : undefined}
            className={isActive ? 'active' : undefined}
            href={item.href}
            key={item.id}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
