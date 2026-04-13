'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function NosotrosPage() {
    const { language } = useLanguage();

    const content = {
        en: {
            badge: "About Us",
            title: "Our Story",
            subtitle: "Learn more about BridgeHealth and our mission to connect patients with top medical specialists in Colombia.",
            paragraph1: "BridgeHealth is a leading medical tourism agency dedicated to providing international patients with access to world-class healthcare in Colombia.",
            paragraph2: "We partner exclusively with internationally accredited clinics and top-rated medical professionals to ensure you receive the highest quality of care."
        },
        es: {
            badge: "Sobre Nosotros",
            title: "Nuestra Historia",
            subtitle: "Conoce más sobre BridgeHealth y nuestra misión para conectar pacientes con los mejores especialistas médicos de Colombia.",
            paragraph1: "BridgeHealth es una agencia líder de turismo médico dedicada a brindar a pacientes internacionales acceso a atención médica de clase mundial en Colombia.",
            paragraph2: "Nos asociamos exclusivamente con clínicas acreditadas internacionalmente y profesionales médicos de primer nivel para asegurar que recibas la atención de la más alta calidad."
        }
    };

    const t = content[language] || content.es; // Fallback to Spanish or language

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

