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
            {/* Background Image */}
            <img
                src={clinic.image}
                alt={clinic.name}
                className={styles.image}
            />

            {/* Content Overlay */}
            <div className={styles.content}>
                <h3 className={styles.title}>{clinic.name}</h3>

                {/* Content revealed on hover */}
                <div className={styles.hiddenContent}>
                    <div className={styles.location}>
                        <span>📍</span> {clinic.location}
                    </div>

                    <p className={styles.description}>{clinic.description}</p>

                    {clinicSpecialties.length > 0 && (
                        <div className={styles.specialties}>
                            {clinicSpecialties.map((spec, index) => (
                                <span key={index} className={styles.badge}>{spec}</span>
                            ))}
                        </div>
                    )}

                    <div className={styles.footer}>
                        <div className={styles.rating}>
                            <span>★</span>
                            <span>{clinic.rating}</span>
                            <span className={styles.reviews}>({clinic.reviews})</span>
                        </div>
                        <span className={styles.arrow}>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
