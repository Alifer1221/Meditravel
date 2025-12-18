import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Hero.module.css';

export default function Hero() {
    const videoRef = useRef(null);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const { language } = useLanguage();
    const t = translations[language].hero;
    const words = t.words; // Get words from dictionary

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7; // Slow down slightly for better effect
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, []);

    useEffect(() => {
        // Reset state when language changes
        setText('');
        setLoopNum(0);
        setIsDeleting(false);
    }, [language]);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 80 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500); // Pause at end
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, words]);

    // Helper to render text based on language logic
    const renderTypingText = () => {
        // Spanish logic: first char is gender suffix (A/O) which needs to be part of prefix style
        if (language === 'es') {
            const firstChar = text.charAt(0);
            const rest = text.substring(1);
            return (
                <>
                    <span>{firstChar}</span>
                    <span className={styles.highlight}>{rest}</span>
                </>
            );
        }
        // English/Default logic: Full word is highlighted
        return <span className={styles.highlight}>{text}</span>;
    };

    return (
        <section className={styles.hero}>
            <div className={styles.videoBackground}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                    poster="https://images.pexels.com/photos/7578764/pexels-photo-7578764.jpeg"
                >
                    <source src="https://raw.githubusercontent.com/Amadeusguitarte/cesaresgey/main/WhatsApp%20Video%202025-12-16%20at%207.56.43%20PM.mp4" type="video/mp4" />
                </video>
                <div className={styles.overlay}></div>
                <div className={styles.pattern}></div>
            </div>

            <div className={styles.content}>
                <p className={styles.topText}>
                    {t.topText}
                </p>

                <h1 className={styles.title}>
                    <span>{t.titleStatic}</span>
                    <span className={styles.dynamicTextGroup}>
                        {language === 'es' ? 'NUESTR' : ''}
                        <span className={styles.typewriterWrapper}>
                            {renderTypingText()}
                            <span className={styles.cursor}>_</span>
                        </span>
                    </span>
                </h1>

                <p className={styles.subtitle}>
                    {t.subtitle}
                </p>

                <div className={styles.ctas}>
                    <Link href="/especialidades" className={styles.btnPrimary}>
                        {t.ctaPrimary}
                        <span className={styles.arrow}>→</span>
                    </Link>
                    <Link href="/clinicas" className={styles.btnSecondary}>
                        {t.ctaSecondary}
                    </Link>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>50+</span>
                        <span className={styles.statLabel}>{t.stats.clinics}</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>10k+</span>
                        <span className={styles.statLabel}>Pacientes Atendidos</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>98%</span>
                        <span className={styles.statLabel}>Satisfacción</span>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>Descubre más</span>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel}></div>
                </div>
            </div>
        </section>
    );
}
