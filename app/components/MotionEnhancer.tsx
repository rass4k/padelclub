'use client';

import { useEffect } from 'react';

const revealSelectors = [
  '.hero-content > *',
  '.booking-hero div > *',
  '.day-tabs button',
  '.mobile-schedule-grid',
  '.booking-summary-card',
  '.club-copy > *',
  '.club-gallery figure',
  '.classes-photo',
  '.classes-content > *',
  '.community-photo',
  '.community-copy > *',
  '.location-copy > *',
  '.map-panel',
  '.final-cta > div > *',
  '.confirmation-card > *',
].join(', ');

export default function MotionEnhancer() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));

    elements.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 8, 6) * 45}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
