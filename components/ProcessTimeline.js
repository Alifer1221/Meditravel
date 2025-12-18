'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline() {
    const { language } = useLanguage();
    const t = translations[language].timeline;
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const [visibleSteps, setVisibleSteps] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate line width when section is visible
                        if (lineRef.current) {
                            lineRef.current.style.width = '100%';
                        }

                        // Show all steps sequentially
                        const steps = document.querySelectorAll(`.${styles.stepItem}`);
                        steps.forEach((step, idx) => {
                            setTimeout(() => {
                                step.classList.add(styles.visible);
                            }, idx * 200);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t.title}</h2>
                    <p className={styles.subtitle}>{t.subtitle}</p>
                </div>

                <div className={styles.timeline} ref={containerRef}>
                    <div className={styles.line}></div>
                    <div className={styles.progressLine} ref={lineRef}></div>

                    {t.steps.map((step, index) => (
                        <div
                            key={index}
                            className={styles.stepItem}
                        >
                            <div className={styles.markerContainer}>
                                <div className={styles.marker}>
                                    <span className={styles.arrowIcon}>→</span>
                                </div>
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{step.title}</h3>
                                <p className={styles.cardDesc}>{step.description}</p>
                            </div>

                            <div className={styles.labelContainer}>
                                <span className={styles.stepLabel}>Step {index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className={styles.ctaContainer}>
                    <a href="/agenda" className={styles.ctaButton}>
                        {language === 'es' ? "Agendar una cita para organizar tu plan de viaje" : "Schedule an appointment to organize your travel plan"}
                    </a>
                </div>
            </div>
        </section>
    );
}
