import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ClinicCard.module.css';

export default function ClinicCard({ clinic, variant = 'middle' }) {
    const { language } = useLanguage();
    const t = translations[language].common;

    const { id: clinicId, name, location, accreditation, description, image } = clinic;

    return (
        <Link href={`/clinicas/${clinic.id}`} className={`${styles.card} ${styles[variant]}`}>
            <div className={styles.cardInner}>

                {/* Image Section */}
                <div className={styles.imageSection}>
                    <img
                        src={clinic.image}
                        alt={clinic.name}
                        className={styles.image}
                    />
                    {/* Badge Pill */}
                    <div className={styles.badge}>
                        <span className={styles.badgeText}>{clinic.accreditation ? 'CERTIFIED' : 'CLINIC'}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                    <h3 className={styles.title}>{clinic.name}</h3>
                    <p className={styles.description}>
                        {clinic.description}
                    </p>
                </div>

            </div>
        </Link>
    );
}
