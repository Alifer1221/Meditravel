'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ProcessTimeline.module.css';

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
                        {language === 'es' ? 'Tu Salud, Nuestra Prioridad' : 'Your Health, Our Priority'}
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

                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#fdfbf7',
                    color: '#00b4cc',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    fontWeight: '800',
                    textDecoration: 'none',
                    width: 'fit-content',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}>
                    {t.ctaButton || (language === 'es' ? 'AGENDAR CITA' : 'BOOK APPOINTMENT')} {' >'}
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
                            <div className={styles.stepLabel}>
                                {language === 'es' ? `PASO ${index + 1}` : `STEP ${index + 1}`}*
                            </div>
                            <h3 className={styles.cardTitle}>{step.title}</h3>

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
