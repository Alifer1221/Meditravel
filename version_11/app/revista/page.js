'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/data';
import styles from './page.module.css';

export default function RevistaPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setArticles(getArticles());
    }, []);

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Revista de Salud</span>
                        <h1 className={styles.title}>Artículos y Guías</h1>
                        <p className={styles.subtitle}>
                            Mantente informado con los últimos artículos sobre turismo médico,
                            consejos de salud y guías de viaje.
                        </p>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
