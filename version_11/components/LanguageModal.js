'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageModal.module.css';

export default function LanguageModal() {
    const { setLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('medictravel_lang');
        if (!savedLang) {
            setIsVisible(true);
        }
    }, []);

    const handleSelect = (lang) => {
        setLanguage(lang);
        localStorage.setItem('medictravel_lang', lang);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Welcome / Bienvenido</h2>
                <p className={styles.subtitle}>Please select your language / Por favor seleccione su idioma</p>

                <div className={styles.buttons}>
                    <button onClick={() => handleSelect('en')} className={styles.btn}>
                        🇺🇸 English
                    </button>
                    <button onClick={() => handleSelect('es')} className={styles.btn}>
                        🇪🇸 Español
                    </button>
                </div>
            </div>
        </div>
    );
}
