'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/especialidades', label: 'Especialidades', icon: '🏥' },
        { href: '/admin/clinicas', label: 'Clínicas', icon: '🏛️' },
        { href: '/admin/revista', label: 'Revista', icon: '📰' },
        { href: '/admin/testimonios', label: 'Testimonios', icon: '💬' },
        { href: '/admin/chat', label: 'Chat Soporte', icon: '🎧' },
        { href: '/admin/users', label: 'Base de Datos', icon: '👥' },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🏥</span>
                        <span className={styles.logoText}>MedicTravel</span>
                    </Link>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backLink}>
                        ← Volver al Sitio
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                    <h1 className={styles.pageTitle}>Panel de Administración</h1>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
