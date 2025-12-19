'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ProcessTimeline.module.css';

const Icons = {
    contact: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    ),
    assessment: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
        </svg>
    ),
    plan: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    ),
    treatment: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    recovery: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
        </svg>
    )
};

export default function ProcessTimeline() {
    const { language } = useLanguage();
    const t = translations[language].timeline;

    const [activeStep, setActiveStep] = useState(0);
    const cardsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Active when card is in middle 20% of screen
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.dataset.index);
                    setActiveStep(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* LEFT COLUMN: Sticky Branding */}
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>
                        {language === 'es' ? <>Tu Salud,<br />Nuestra Prioridad</> : <>Your Health,<br />Our Priority</>}
                    </h2>

                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <div className={styles.checkIcon}>✓</div>
                            <span>
                                {language === 'es'
                                    ? 'Clínicas acreditadas internacionalmente con tecnología de punta.'
                                    : 'Internationally accredited clinics with state-of-the-art technology.'}
                            </span>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.checkIcon}>✓</div>
                            <span>
                                {language === 'es'
                                    ? 'Ahorra hasta un 70% en procedimientos sin sacrificar calidad.'
                                    : 'Save up to 70% on procedures without sacrificing quality.'}
                            </span>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.checkIcon}>✓</div>
                            <span>
                                {language === 'es'
                                    ? 'Paquetes todo incluido: Viaje, alojamiento y recuperación.'
                                    : 'All-inclusive packages: Travel, accommodation, and recovery.'}
                            </span>
                        </div>
                    </div>

                    <a href="/agenda" className={styles.ctaButton}>
                        {t.ctaButton || (language === 'es' ? 'AGENDAR CITA' : 'BOOK APPOINTMENT')}
                    </a>
                </div>

                {/* RIGHT COLUMN: Scrolling Cards */}
                <div className={styles.rightColumn}>
                    {t.steps.map((step, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            data-index={index}
                            className={styles.cardWrapper}
                            data-active={activeStep === index}
                        >
                            <div className={styles.cardImageBase} />
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <div className={styles.stepLabel}>
                                            {language === 'es' ? `PASO ${index + 1}` : `STEP ${index + 1}`}*
                                        </div>
                                        <h3 className={styles.cardTitle}>{step.title}</h3>
                                    </div>
                                    <div className={styles.cardIconBadge}>
                                        {Icons[step.iconType]}
                                    </div>
                                </div>

                                <div className={styles.cardList}>
                                    <div className={styles.cardListItem}>
                                        <div className={styles.cardListNum}>01</div>
                                        <div className={styles.cardListText}>
                                            <strong>{language === 'es' ? 'Descripción' : 'Overview'}</strong>
                                            {step.description}
                                        </div>
                                    </div>
                                    <div className={styles.cardListItem}>
                                        <div className={styles.cardListNum}>02</div>
                                        <div className={styles.cardListText}>
                                            <strong>{language === 'es' ? 'Detalle' : 'Details'}</strong>
                                            {language === 'es' ? 'Coordinación completa.' : 'Full coordination.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GRID CHANNEL 3: Sticky Timeline */}
                <div className={styles.timelineStickySidebar}>
                    <div className={styles.timelineTrack} />
                    {t.steps.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.timelineItem} ${activeStep === index ? styles.activeItem : ''}`}
                        >
                            <div className={styles.timelineLabel}>
                                {language === 'es' ? `PASO ${index + 1}` : `STEP ${index + 1}`}
                            </div>
                            <div className={`${styles.dot} ${activeStep === index ? styles.activeDot : ''}`} />
                        </div>
                    ))}
                </div>

            </div>
        </section >
    );
}
