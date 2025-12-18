'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSpecialties, getClinics, getArticles, getTestimonials } from '@/lib/data';
import styles from './page.module.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        specialties: 0,
        clinics: 0,
        articles: 0,
        testimonials: 0
    });

    useEffect(() => {
        setStats({
            specialties: getSpecialties().length,
            clinics: getClinics().length,
            articles: getArticles().length,
            testimonials: getTestimonials().length
        });
    }, []);

    const cards = [
        {
            title: 'Especialidades',
            count: stats.specialties,
            icon: '🏥',
            href: '/admin/especialidades',
            color: '#00b4cc'
        },
        {
            title: 'Clínicas',
            count: stats.clinics,
            icon: '🏛️',
            href: '/admin/clinicas',
            color: '#5271fa'
        },
        {
            title: 'Artículos',
            count: stats.articles,
            icon: '📰',
            href: '/admin/revista',
            color: '#10b981'
        },
        {
            title: 'Testimonios',
            count: stats.testimonials,
            icon: '💬',
            href: '/admin/testimonios',
            color: '#f59e0b'
        },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.welcome}>
                <h1>Bienvenido al Panel de Administración</h1>
                <p>Gestiona el contenido de tu sitio de turismo médico desde aquí.</p>
            </div>

            <div className={styles.statsGrid}>
                {cards.map((card) => (
                    <Link key={card.title} href={card.href} className={styles.statCard}>
                        <div
                            className={styles.statIcon}
                            style={{ backgroundColor: card.color + '20', color: card.color }}
                        >
                            {card.icon}
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statCount}>{card.count}</span>
                            <span className={styles.statTitle}>{card.title}</span>
                        </div>
                        <span className={styles.statArrow}>→</span>
                    </Link>
                ))}
            </div>

            <div className={styles.quickActions}>
                <h2>Acciones Rápidas</h2>
                <div className={styles.actionsGrid}>
                    <Link href="/admin/especialidades" className={styles.actionCard}>
                        <span className={styles.actionIcon}>➕</span>
                        <span>Agregar Especialidad</span>
                    </Link>
                    <Link href="/admin/clinicas" className={styles.actionCard}>
                        <span className={styles.actionIcon}>➕</span>
                        <span>Agregar Clínica</span>
                    </Link>
                    <Link href="/admin/revista" className={styles.actionCard}>
                        <span className={styles.actionIcon}>➕</span>
                        <span>Nuevo Artículo</span>
                    </Link>
                    <Link href="/admin/testimonios" className={styles.actionCard}>
                        <span className={styles.actionIcon}>➕</span>
                        <span>Nuevo Testimonio</span>
                    </Link>
                </div>
            </div>

            <div className={styles.tips}>
                <h2>Consejos</h2>
                <div className={styles.tipsList}>
                    <div className={styles.tip}>
                        <span className={styles.tipIcon}>💡</span>
                        <p>Mantén las imágenes de las especialidades actualizadas para una mejor presentación.</p>
                    </div>
                    <div className={styles.tip}>
                        <span className={styles.tipIcon}>💡</span>
                        <p>Agrega testimonios regularmente para generar confianza con los visitantes.</p>
                    </div>
                    <div className={styles.tip}>
                        <span className={styles.tipIcon}>💡</span>
                        <p>Publica artículos en la revista para mejorar el SEO del sitio.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
