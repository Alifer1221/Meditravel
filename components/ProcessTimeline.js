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

    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const sectionHeight = sectionRef.current.offsetHeight;

            // Calculate progress based on how much of the section has been scrolled
            // We want the horizontal scroll to happen while the section is in view
            const start = rect.top;

            // Total scrollable distance within the section
            const properScrollDistance = sectionHeight - viewportHeight;

            // How far we've scrolled into the section (offset by when it hits top)
            const scrolled = -start;

            let progress = 0;
            if (scrolled > 0 && properScrollDistance > 0) {
                progress = scrolled / properScrollDistance;
            }

            // Clamp between 0 and 1
            progress = Math.min(Math.max(progress, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.stickyWrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{t.title}</h2>
                        <p className={styles.subtitle}>{t.subtitle}</p>
                    </div>

                    <div className={styles.timelineMask}>
                        <div
                            className={styles.timelineTrack}
                            style={{
                                // Entrance Effect:
                                // At progress 0, Center of Step 1 is at 80vw (off-center to right)
                                // As progress goes to 0.2 (approx), it settles at 50vw.
                                // Then it pans normally.
                                // Simplified: Start at 70vw.
                                transform: `translateX(calc(70vw - 200px - ${scrollProgress * (t.steps.length) * 400}px))`
                            }}
                            ref={scrollContainerRef}
                        >
                            <div className={styles.line}></div>
                            <div
                                className={styles.fillingLine}
                                style={{
                                    // Make line start from "off screen" relative to track (track offset -100vw in CSS)
                                    // Width needs to cover that gap + progress
                                    width: `calc(100vw + ${scrollProgress * (t.steps.length) * 400}px)`
                                }}
                            ></div>

                            {t.steps.map((step, index) => {
                                // Calculate how close this step is to the "virtual center"
                                // Virtual center is exactly at index = scrollProgress * (total - 1)
                                const activeIndex = scrollProgress * (t.steps.length - 1);
                                const distanceFromCenter = Math.abs(activeIndex - index);
                                const isFocused = distanceFromCenter < 0.5;

                                return (
                                    <div
                                        key={index}
                                        className={`${styles.stepItem} ${isFocused ? styles.activeStep : ''}`}
                                        style={{
                                            // Dynamic scale: 1.0 normally, up to 1.3 at center
                                            transform: `scale(${1 + Math.max(0, 0.3 - distanceFromCenter * 0.3)})`,
                                            opacity: Math.max(0.4, 1 - distanceFromCenter * 0.5)
                                        }}
                                    >
                                        <div className={styles.markerContainer}>
                                            <div className={styles.marker}>
                                                <span className={styles.stepNumber}>{index + 1}</span>
                                            </div>
                                        </div>

                                        <div className={styles.content}>
                                            <div className={styles.card}>
                                                <h3 className={styles.cardTitle}>{step.title}</h3>
                                                <p className={styles.cardDesc}>{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
