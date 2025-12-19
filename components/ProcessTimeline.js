'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline() {
    const { language } = useLanguage();
    const t = translations[language].timeline;

    const sectionRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Dynamic Words for Title (optional, matching Hero style?) 
    // Just static title for now based on CSS.

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const sectionHeight = sectionRef.current.offsetHeight;

            // Total distance to scroll through
            const scrollableDistance = sectionHeight - viewportHeight;

            // Scrolled amount (starts at 0 when section top hits screen top)
            // But we want it to start counting slightly differently?
            // "Sticky" usually means: Top hits 0, then we stay there for X pixels.
            const rawProgress = -rect.top / scrollableDistance;

            // Clamp 0-1
            const progress = Math.min(Math.max(rawProgress, 0), 1);
            setScrollProgress(progress);

            // Calculate active step
            // We have 5 steps.
            // 0.0 - 0.2 -> Step 0
            // 0.2 - 0.4 -> Step 1
            // ...
            const stepIndex = Math.floor(progress * t.steps.length);
            // Ensure we don't exceed max index
            const finalStep = Math.min(stepIndex, t.steps.length - 1);

            setActiveStep(finalStep);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, [t.steps.length]);

    // Manual click on sidebar to scroll to position (Optional, but hard to implement with native scroll. 
    // We'll leave it as visual only or smooth scroll to approximate position if needed)

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.stickyWrapper}>
                <div className={styles.container}>

                    {/* LEFT COLUMN: Static Context */}
                    {/* LEFT COLUMN: Static Context */}
                    <div className={styles.leftColumn}>
                        <h2 className={styles.title}>
                            {language === 'es' ? 'Tu Salud, Nuestra Prioridad' : 'Your Health, Our Priority'}
                        </h2>

                        {/* Feature List (GetJoy Style) */}
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

                        <a href="/agenda" className={styles.ctaButton} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#fdfbf7',
                            color: '#1a4d2e', /* Match Card Text */
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

                    {/* RIGHT COLUMN: Dynamic Cards */}
                    <div className={styles.rightColumn}>

                        <div className={styles.cardWrapper}>
                            {t.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`${styles.card} ${activeStep === index ? styles.activeCard : ''}`}
                                >
                                    <div className={styles.stepLabel}>
                                        {language === 'es' ? 'Paso' : 'Step'} {index + 1}
                                    </div>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                    <p className={styles.cardDesc}>{step.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* TIMELINE SIDEBAR */}
                        <div className={styles.timelineSidebar}>
                            <div className={styles.timelineTrack}></div>
                            {/* Animated Fill Line */}
                            <div
                                className={styles.fillTrack}
                                style={{
                                    height: `${(scrollProgress * 100)}%`
                                }}
                            />

                            {t.steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.timelineItem} ${activeStep === index ? styles.activeItem : ''}`}
                                >
                                    <div className={styles.timelineLabel}>
                                        {language === 'es' ? 'Paso' : 'Step'} {index + 1}
                                    </div>
                                    <div className={`${styles.dot} ${activeStep === index ? styles.activeDot : ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE LIST FALLBACK (Visible only on mobile via CSS) */}
            <div className={`${styles.container} ${styles.mobileList}`}>
                {/* Logic handles display: none in media queries, 
                     but we need to render the content for DOM */}
                {/* CSS determines visibility: @media (max-width: 768px) -> .rightColumn {display:none}, .mobileList {display:flex} */}

                {t.steps.map((step, index) => (
                    <div key={index} className={styles.mobileCard}>
                        <div style={{ color: '#ff5722', fontWeight: '800', marginBottom: '1rem' }}>
                            {language === 'es' ? 'Paso' : 'Step'} {index + 1}
                        </div>
                        <h3 className={styles.cardTitle} style={{ fontSize: '2rem' }}>{step.title}</h3>
                        <p className={styles.cardDesc}>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
