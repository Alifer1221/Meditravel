'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language].nav;

    // Hide navbar on admin pages
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: t.home },
        { href: '/especialidades', label: t.specialties },
        { href: '/clinicas', label: t.clinics },
        { href: '/revista', label: t.magazine },
        { href: '/testimonios', label: t.testimonials },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🏥</span>
                    <span className={styles.logoText}>MedicTravel v2.0</span>
                </Link>

                <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* Language Switcher Removed */}
                </div>

                <div className={styles.rightActions}>
                    <Link href="/agenda" className={styles.scheduleBtn}>
                        {language === 'es' ? 'Agendar Cita' : 'Schedule'}
                    </Link>
                    <a href="tel:+1234567890" className={styles.phoneText}>
                        (619) 320-5003
                    </a>
                    <LanguageSwitcher />
                </div>

                <div className={styles.mobileActions}>
                    <Link href="/agenda" className={styles.scheduleBtnMobile}>
                        {language === 'es' ? 'Agendar' : 'Schedule'}
                    </Link>
                    <button
                        className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.open : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
