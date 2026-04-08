import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './SpecialtyCard.module.css';

export default function SpecialtyCard({ specialty }) {
    const { language } = useLanguage();
    const t = translations[language].common;

    return (
        <Link href={`/especialidades/${specialty.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={specialty.image}
                    alt={specialty.name}
                    className={styles.image}
                />
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{specialty.name}</h3>
                <p className={styles.description}>{specialty.description}</p>
                <div className={styles.link}>
                    {t.viewDetails} <span className={styles.arrow}>→</span>
                </div>
            </div>
        </Link>
    );
}
