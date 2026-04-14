'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const { language } = useLanguage();
    const t = translations[language].nav;

    // Hide navbar on admin pages
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            setIsScrolled(currentScrollY > 50);

            if (currentScrollY > 50 && currentScrollY > lastScrollY.current && !isMobileMenuOpen) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: '/especialidades', label: t.specialties },
        { href: '/destinos', label: t.destinations },
        { href: '/nosotros', label: t.aboutUs },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
            <div className={styles.container}>
                <div className={styles.logoGroup}>
                    <Link href="/" className={styles.logo}>
                        <Image src="/logo-new.svg" alt="BridgeHealth" width={192} height={48} style={{ objectFit: 'contain' }} priority />
                    </Link>
                </div>

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
                    <Link href="/agenda" className={styles.scheduleBtn}>
                        {language === 'es' ? 'Agendar Cita' : 'Schedule'}
                    </Link>
                </div>

                <div className={styles.rightActions}>
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
