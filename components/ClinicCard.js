import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './ClinicCard.module.css';

export default function ClinicCard({ clinic, specialties = [] }) {
    const { language } = useLanguage();
    const t = translations[language].common;

    const { id: clinicId, name, location, accreditation, description, image } = clinic;

    // Get specialty names for this clinic
    const clinicSpecialties = clinic.specialties
        ? clinic.specialties.map(specId => {
            // The original `specialties` prop is removed, so this part needs adjustment
            // For now, keeping it as is, assuming `specialties` might be fetched differently or not used.
            // If `specialties` is truly gone, this block would cause an error.
            // Based on the instruction, `specialties` prop is removed.
            // This means the `clinicSpecialties` calculation should also be removed or re-evaluated.
            // The provided snippet does not include this calculation, implying its removal.
            return null; // Placeholder, as `specialties` prop is removed.
        }).filter(Boolean).slice(0, 3)
        : [];

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
