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
            <div className={styles.imageWrapper}>
                <img
                    src={clinic.image}
                    alt={clinic.name}
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{clinic.name}</h3>
                <p className={styles.location}>{clinic.location}</p>
                {clinic.accreditation && (
                    <p className={styles.accreditation}>{clinic.accreditation}</p>
                )}
            </div>
        </Link>
    );
}
