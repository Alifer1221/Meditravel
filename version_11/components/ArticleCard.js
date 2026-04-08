import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ article }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <Link href={`/revista/${article.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={article.image}
                    alt={article.title}
                    className={styles.image}
                />
                {article.category && (
                    <span className={styles.category}>{article.category}</span>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.date}>{formatDate(article.date)}</span>
                    {article.author && (
                        <>
                            <span className={styles.dot}>•</span>
                            <span className={styles.author}>{article.author}</span>
                        </>
                    )}
                </div>

                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>

                <div className={styles.link}>
                    Leer más <span className={styles.arrow}>→</span>
                </div>
            </div>
        </Link>
    );
}
