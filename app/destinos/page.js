'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function DestinosPage() {
    const { language } = useLanguage();

    const content = {
        en: {
            badge: "Destinations",
            title: "Explore Colombia",
            subtitle: "Discover the best cities and medical hubs in Colombia for your treatment.",
            paragraph1: "Colombia has become a world-class destination for medical tourism, offering state-of-the-art facilities and highly trained specialists in cities like Bogotá, Medellín, and Cali.",
            paragraph2: "Each destination offers a unique blend of high-quality medical care and beautiful tourist attractions, ensuring a comfortable recovery and an unforgettable experience."
        },
        es: {
            badge: "Destinos",
            title: "Explora Colombia",
            subtitle: "Descubre las mejores ciudades y centros médicos en Colombia para tu tratamiento.",
            paragraph1: "Colombia se ha convertido en un destino de clase mundial para el turismo médico, ofreciendo instalaciones de vanguardia y especialistas altamente capacitados en ciudades como Bogotá, Medellín y Cali.",
            paragraph2: "Cada destino ofrece una combinación única de atención médica de alta calidad y hermosos atractivos turísticos, asegurando una recuperación cómoda y una experiencia inolvidable."
        }
    };

    const t = content[language] || content.es;

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>{t.badge}</span>
                        <h1 className={styles.title}>{t.title}</h1>
                        <p className={styles.subtitle}>
                            {t.subtitle}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <p>{t.paragraph1}</p>
                            <p>{t.paragraph2}</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
