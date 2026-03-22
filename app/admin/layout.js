'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Read role from cookie
        const match = document.cookie.match(new RegExp('(^| )user_role=([^;]+)'));
        if (match) {
            setUserRole(match[2]);
        }
        setIsLoading(false);
    }, []);

    // Hide sidebar for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    };

    const allNavItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊', roles: ['admin'] },
        { href: '/admin/especialidades', label: 'Especialidades', icon: '🏥', roles: ['admin'] },
        { href: '/admin/clinicas', label: 'Clínicas', icon: '🏛️', roles: ['admin'] },
        { href: '/admin/revista', label: 'Revista', icon: '📰', roles: ['admin'] },
        { href: '/admin/testimonios', label: 'Testimonios', icon: '💬', roles: ['admin'] },
        { href: '/admin/chat', label: 'Chat Soporte', icon: '🎧', roles: ['admin', 'chat_only'] },
        { href: '/admin/users', label: 'Base de Datos', icon: '👥', roles: ['admin'] },
    ];

    // Fail Closed: If loading or no role found, show nothing (or strict filter)
    const navItems = allNavItems.filter(item =>
        !isLoading && userRole && item.roles.includes(userRole)
    );

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/" className={styles.logo}>
                        <div style={{ position: 'relative', width: '100%', minWidth: '280px', height: '70px' }}>
                            <Image src="/Logo_tight.png" alt="BridgeHealth" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} />
                        </div>
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
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        🚪 Cerrar Sesión
                    </button>
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
