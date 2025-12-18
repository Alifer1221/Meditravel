'use client';

import { useRef } from 'react';
import ClinicCard from './ClinicCard';
import styles from './ClinicCarousel.module.css';

export default function ClinicCarousel({ clinics }) {
    const trackRef = useRef(null);

    const scroll = (direction) => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <button
                onClick={() => scroll('left')}
                className={`${styles.navButton} ${styles.prevButton}`}
                aria-label="Previous"
            >
                ←
            </button>

            <div className={styles.carouselTrack} ref={trackRef}>
                {clinics.map(clinic => (
                    <div key={clinic.id} className={styles.carouselItem}>
                        <ClinicCard clinic={clinic} />
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label="Next"
            >
                →
            </button>
        </div>
    );
}
