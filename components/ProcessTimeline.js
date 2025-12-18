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
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleSteps((prev) => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
        );

        const steps = document.querySelectorAll(`.${styles.stepItem}`);
        steps.forEach((step) => observer.observe(step));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !lineRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start filling when the top of the TIMELINE hits the center of the screen
            const triggerPoint = windowHeight / 2;

            if (rect.top <= triggerPoint) {
                const scrolled = triggerPoint - rect.top;
                const totalHeight = rect.height;
                let percentage = (scrolled / totalHeight) * 100;

                // Clamp between 0 and 100
                percentage = Math.min(Math.max(percentage, 0), 100);
                lineRef.current.style.height = `${percentage}%`;
            } else {
                lineRef.current.style.height = '0%';
            }

            // Update Markers
            const steps = containerRef.current.querySelectorAll(`.${styles.stepItem}`);
            steps.forEach((step) => {
                const marker = step.querySelector(`.${styles.marker}`);
                if (!marker) return;

                const stepRect = step.getBoundingClientRect();
                const markerCenter = stepRect.top + (stepRect.height / 2);

                if (markerCenter <= triggerPoint) {
                    marker.classList.add(styles.activeMarker);
                } else {
                    marker.classList.remove(styles.activeMarker);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
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
                            data-index={index}
                            className={`${styles.stepItem} ${index % 2 === 0 ? styles.left : styles.right} ${visibleSteps.includes(index) ? styles.visible : ''}`}
                        >
                            <div className={styles.content}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                    <p className={styles.cardDesc}>{step.description}</p>
                                </div>
                            </div>

                            <div className={styles.markerContainer}>
                                <div className={styles.marker}>
                                    <span className={styles.arrowIcon}>↓</span>
                                </div>
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
