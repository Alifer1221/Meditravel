'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticleById, getArticles } from '@/lib/data';
import styles from './page.module.css';

export default function ArticleDetailPage() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        if (params.id) {
            const a = getArticleById(params.id);
            setArticle(a);

            const allArticles = getArticles();
            const related = allArticles.filter(art => art.id !== params.id).slice(0, 3);
            setRelatedArticles(related);
        }
    }, [params.id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (!article) {
        return (
            <>
                <Navbar />
                <main className={styles.loading}>
                    <p>Cargando artículo...</p>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroImage}>
                        <img src={article.image} alt={article.title} />
                        <div className={styles.heroOverlay}></div>
                    </div>
                    <div className={styles.heroContent}>
                        <Link href="/revista" className={styles.backLink}>
                            ← Volver a Revista
                        </Link>
                        {article.category && (
                            <span className={styles.category}>{article.category}</span>
                        )}
                        <h1 className={styles.title}>{article.title}</h1>
                        <div className={styles.meta}>
                            {article.author && (
                                <span className={styles.author}>Por {article.author}</span>
                            )}
                            <span className={styles.date}>{formatDate(article.date)}</span>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            <article className={styles.article}>
                                <div className={styles.content}>
                                    <p className={styles.excerpt}>{article.excerpt}</p>
                                    <div className={styles.body}>
                                        {article.content.split('\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Share */}
                                <div className={styles.share}>
                                    <span>Compartir:</span>
                                    <div className={styles.shareButtons}>
                                        <button className={styles.shareButton}>Facebook</button>
                                        <button className={styles.shareButton}>Twitter</button>
                                        <button className={styles.shareButton}>LinkedIn</button>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className={styles.sidebar}>
                                <div className={styles.authorCard}>
                                    <div className={styles.authorAvatar}>
                                        {article.author ? article.author.charAt(0) : 'A'}
                                    </div>
                                    <h4>{article.author || 'Autor Anónimo'}</h4>
                                    <p>Especialista en turismo médico y salud internacional.</p>
                                </div>

                                <div className={styles.ctaCard}>
                                    <h4>¿Tienes preguntas?</h4>
                                    <p>Contáctanos para recibir asesoría personalizada sobre turismo médico.</p>
                                    <Link href="/clinicas" className={styles.ctaButton}>
                                        Ver Clínicas
                                    </Link>
                                </div>
                            </aside>
                        </div>

                        {/* Related Articles */}
                        {relatedArticles.length > 0 && (
                            <div className={styles.related}>
                                <h3>Artículos Relacionados</h3>
                                <div className={styles.relatedGrid}>
                                    {relatedArticles.map((art) => (
                                        <ArticleCard key={art.id} article={art} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
