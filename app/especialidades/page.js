'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpecialtyCard from '@/components/SpecialtyCard';
import { getSpecialties } from '@/lib/data';
import styles from './page.module.css';

export default function EspecialidadesPage() {
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        setSpecialties(getSpecialties());
    }, []);

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Especialidades Médicas</span>
                        <h1 className={styles.title}>Nuestras Especialidades</h1>
                        <p className={styles.subtitle}>
                            Descubre nuestra amplia gama de especialidades médicas con los mejores
                            profesionales y tecnología de vanguardia.
                        </p>
                    </div>
                </section>

                {/* Specialties Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {specialties.map((specialty) => (
                                <SpecialtyCard key={specialty.id} specialty={specialty} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
