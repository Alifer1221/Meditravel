'use client';

import { useRef, useState } from 'react';
import ClinicCard from './ClinicCard';
import styles from './ClinicCarousel.module.css';

export default function ClinicCarousel({ clinics }) {
    const trackRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

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
            const gap = 24; // var(--spacing-6) is roughly 24px (1.5rem)
            const scrollPos = index * (cardWidth + gap);
            trackRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    // Update active index on scroll
    const handleScroll = () => {
        if (trackRef.current) {
            const scrollLeft = trackRef.current.scrollLeft;
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const gap = 24;
            const index = Math.round(scrollLeft / (cardWidth + gap));
            setActiveIndex(index);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className={`${styles.navButton} ${styles.prevButton}`}
                aria-label="Previous"
            >
                ←
            </button>

            <div
                className={styles.carouselTrack}
                ref={trackRef}
                onScroll={handleScroll}
            >
                {clinics.map(clinic => (
                    <div key={clinic.id} className={styles.carouselItem}>
                        <ClinicCard clinic={clinic} />
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label="Next"
            >
                →
            </button>

            {/* Pagination Dots */}
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
