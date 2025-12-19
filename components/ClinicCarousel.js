'use client';

import { useRef, useState } from 'react';
import ClinicCard from './ClinicCard';
import styles from './ClinicCarousel.module.css';

export default function ClinicCarousel({ clinics }) {
    const trackRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [showNav, setShowNav] = useState(false);

    const scroll = (direction) => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollToSlide = (index) => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const gap = 0; // Gap is removed in CSS
            // Correction for negative margin? Overlap is 25px.
            // Simplified scroll logic for now
            const scrollPos = index * (cardWidth - 25);
            trackRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    // Update active index on scroll
    const handleScroll = () => {
        if (trackRef.current) {
            const scrollLeft = trackRef.current.scrollLeft;
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const index = Math.round(scrollLeft / (cardWidth - 25));
            setActiveIndex(index);
        }
    };

    return (
        <div
            className={styles.carouselContainer}
            onMouseEnter={() => setShowNav(true)}
            onMouseLeave={() => setShowNav(false)}
        >
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className={`${styles.navButton} ${styles.prevButton} ${showNav ? styles.show : ''}`}
                aria-label="Previous"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
            </button>

            <div
                className={styles.carouselTrack}
                ref={trackRef}
                onScroll={handleScroll}
            >
                {clinics.map((clinic, index) => {
                    let variant = 'middle';
                    if (index === 0) variant = 'start';
                    else if (index === clinics.length - 1) variant = 'end';

                    return (
                        <div key={clinic.id} className={styles.carouselItem}>
                            <ClinicCard clinic={clinic} variant={variant} />
                        </div>
                    );
                })}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className={`${styles.navButton} ${styles.nextButton} ${showNav ? styles.show : ''}`}
                aria-label="Next"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination Dots - Keep mostly visible or outside hover logic? User didn't specify. */}
            <div className={styles.pagination}>
                {clinics.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                        onClick={() => scrollToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
