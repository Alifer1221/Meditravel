'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Hero from '@/components/Hero';
import SpecialtyCard from '@/components/SpecialtyCard';
// import ClinicCard from '@/components/ClinicCard'; // Replaced by Carousel
import ClinicCarousel from '@/components/ClinicCarousel';
import TestimonialCard from '@/components/TestimonialCard';
import { getSpecialties, getClinics, getTestimonials } from '@/lib/data';
import styles from './page.module.css';
import Link from 'next/link';
import ProcessTimeline from '@/components/ProcessTimeline';
import SpecialtiesTabs from '@/components/SpecialtiesTabs';
import DestinationHighlight from '@/components/DestinationHighlight';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language].home;
  const common = translations[language].common;

  // Fetch data based on current language
  const specialties = getSpecialties(language).slice(0, 6);
  const clinics = getClinics(language).slice(0, 3);
  const testimonials = getTestimonials(language).slice(0, 3);

  return (
    <main>
      <Hero />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t.specialtiesTitle}</h2>
            <p className={styles.sectionSubtitle}>{t.specialtiesSubtitle}</p>
          </div>

          <SpecialtiesTabs specialties={specialties} />

        </div>
      </section>

      <DestinationHighlight />

      <ProcessTimeline />

      {/* Clinics Section */}
      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t.clinicsTitle}</h2>
            <p className={styles.sectionSubtitle}>{t.clinicsSubtitle}</p>
          </div>
          {/* Carousel instead of Grid */}
          <ClinicCarousel clinics={clinics} />

          {/* Removed Grid Button since Carousel is scrollable */}
          <div className={styles.centerBtn}>
            <Link href="/clinicas" className={styles.btnSecondary}>
              {common.viewDetails} →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t.testimonialsTitle}</h2>
            <p className={styles.sectionSubtitle}>{t.testimonialsSubtitle}</p>
          </div>
          <div className={styles.grid}>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </main >
  );
}
