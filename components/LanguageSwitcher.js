'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            className={styles.switcher}
            onClick={toggleLanguage}
            title={language === 'en' ? "Cambiar a Español" : "Switch to English"}
        >
            <span className={styles.globe}>🌐</span>
            <span className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}>EN</span>
            <span className={styles.divider}>/</span>
            <span className={`${styles.lang} ${language === 'es' ? styles.active : ''}`}>ES</span>
        </button>
    );
}
