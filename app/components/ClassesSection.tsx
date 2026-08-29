'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const whatsappNumber = '56977333908';

const classOptions = [
  {
    id: 'individual',
    icon: 'bi-person',
    title: 'Clase individual',
    price: '$16.000',
    unit: 'por clase',
    detail: 'Entrenamiento personalizado',
  },
  {
    id: 'pack-4',
    icon: 'bi-calendar2-week',
    title: 'Pack 4 clases',
    price: '$56.000',
    unit: 'mensual',
    detail: '$14.000 por clase',
  },
  {
    id: 'pack-8',
    icon: 'bi-calendar2-check',
    title: 'Pack 8 clases',
    price: '$100.000',
    unit: 'mensual',
    detail: '$12.500 por clase',
  },
] as const;

export default function ClassesSection() {
  const [selectedOptionId, setSelectedOptionId] = useState<(typeof classOptions)[number]['id']>('individual');

  const selectedOption = classOptions.find((option) => option.id === selectedOptionId) ?? classOptions[0];

  const whatsappHref = useMemo(() => {
    const message = `Hola Padel Club Constitucion, quiero consultar disponibilidad para ${selectedOption.title} (${selectedOption.price} ${selectedOption.unit}).`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [selectedOption]);

  return (
    <section id="clases" className="classes-section">
      <div className="classes-photo">
        <Image
          src="/clases-particulares-nueva.png"
          alt="Afiche de clases particulares de Padel Club Constitucion"
          width={1136}
          height={1385}
          sizes="(max-width: 1040px) 100vw, 430px"
        />
      </div>
      <div className="classes-content">
        <p className="eyebrow">Clases particulares</p>
        <h2>Lleva tu p&aacute;del al siguiente nivel</h2>
        <p>Entrenamientos personalizados para todos los niveles.</p>
        <div className="coach-line">
          <strong>Gonzalo Rodr&iacute;guez</strong>
          <span>2da categor&iacute;a</span>
        </div>
        <div className="pricing-list selectable-pricing" role="radiogroup" aria-label="Selecciona un plan de clases">
          {classOptions.map((option) => {
            const isSelected = option.id === selectedOption.id;

            return (
              <button
                aria-checked={isSelected}
                className={isSelected ? 'selected' : ''}
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                role="radio"
                type="button"
              >
                <span>
                  <i className={`bi ${option.icon}`} aria-hidden="true" />
                  <span>
                    {option.title}
                    <small>{option.detail}</small>
                  </span>
                </span>
                <strong>{option.price}</strong>
              </button>
            );
          })}
        </div>
        <div className="class-hours">
          <div>
            <span>Lunes a viernes</span>
            <strong>09:00 - 20:00 hrs</strong>
          </div>
          <div>
            <span>S&aacute;bado</span>
            <strong>09:00 - 13:00 hrs</strong>
          </div>
        </div>
        <a className="primary-btn wide class-selected-cta" href={whatsappHref} target="_blank" rel="noreferrer">
          <i className="bi bi-whatsapp" aria-hidden="true" />
          Consultar {selectedOption.title}
        </a>
      </div>
    </section>
  );
}
