'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './SpecialtiesTabs.module.css';

export default function SpecialtiesTabs({ specialties }) {
    const [activeTab, setActiveTab] = useState(0);
    const [direction, setDirection] = useState('right'); // 'right' means content enters from right (moving left)
    const { language } = useLanguage();
    const t = translations[language].common;
    const currentSpecialty = specialties[activeTab];

    const handleTabClick = (index) => {
        if (index === activeTab) return;
        setDirection(index > activeTab ? 'right' : 'left');
        setActiveTab(index);
    };

    return (
        <div className={styles.container}>
            {/* Tabs Navigation */}
            <div className={styles.tabsContainer}>
                {specialties.map((specialty, index) => (
                    <button
                        key={specialty.id}
                        onClick={() => handleTabClick(index)}
                        className={`${styles.tab} ${activeTab === index ? styles.activeTab : ''}`}
                    >
                        {specialty.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className={styles.contentWrapper}>
                <div
                    key={activeTab} // Key forces re-render for animation
                    className={`${styles.contentCard} ${direction === 'right' ? styles.slideInRight : styles.slideInLeft}`}
                >
                    <div className={styles.imageColumn}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={currentSpecialty.image}
                                alt={currentSpecialty.name}
                                className={styles.image}
                            />
                            <div className={styles.imageDecor}></div>
                        </div>
                    </div>

                    <div className={styles.textColumn}>
                        <h3 className={styles.title}>{currentSpecialty.name}</h3>
                        <p className={styles.description}>{currentSpecialty.fullDescription || currentSpecialty.description}</p>

                        {/* Procedures List */}
                        {currentSpecialty.procedures && (
                            <ul className={styles.proceduresList}>
                                {currentSpecialty.procedures.slice(0, 4).map((proc, idx) => (
                                    <li key={idx} className={styles.procedureItem}>
                                        <span className={styles.checkIcon}>✓</span>
                                        {proc}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Link href={`/especialidades/${currentSpecialty.id}`} className={styles.ctaButton}>
                            {t.viewDetails}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
