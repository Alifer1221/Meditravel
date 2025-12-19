import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ClinicCard.module.css';

export default function ClinicCard({ clinic, specialties = [] }) {
    const { language } = useLanguage();
    const t = translations[language].common;

    // Get specialty names for this clinic
    const clinicSpecialties = clinic.specialties
        ? clinic.specialties.map(specId => {
            const spec = specialties.find(s => s.id === specId);
            return spec ? spec.name : null;
        }).filter(Boolean).slice(0, 3)
        : [];

    return (
        <Link href={`/clinicas/${clinic.id}`} className={styles.card}>
            {/* Skewed Container */}
            <div className={styles.skewWrapper}>

                {/* Image Section */}
                <div className={styles.imageSection}>
                    <div className={styles.unskewImage}>
                        <img
                            src={clinic.image}
                            alt={clinic.name}
                            className={styles.image}
                        />
                    </div>
                    {/* Badge Pill */}
                    <div className={styles.badge}>
                        <span className={styles.badgeText}>{clinic.accreditation ? 'CERTIFIED' : 'CLINIC'}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                    <div className={styles.unskewContent}>
                        <h3 className={styles.title}>{clinic.name}</h3>
                        <p className={styles.description}>
                            {clinic.description}
                        </p>
                    </div>
                </div>

            </div>
        </Link>
    );
}
