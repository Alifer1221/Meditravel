'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClinicCard from '@/components/ClinicCard';
import { getClinics, getSpecialties } from '@/lib/data';
import styles from './page.module.css';

export default function ClinicasPage() {
    const [clinics, setClinics] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        setClinics(getClinics());
        setSpecialties(getSpecialties());
    }, []);

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Clínicas Asociadas</span>
                        <h1 className={styles.title}>Clínicas de Excelencia</h1>
                        <p className={styles.subtitle}>
                            Trabajamos con las clínicas más prestigiosas de Latinoamérica,
                            certificadas internacionalmente para tu tranquilidad.
                        </p>
                    </div>
                </section>

                {/* Clinics Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {clinics.map((clinic) => (
                                <ClinicCard key={clinic.id} clinic={clinic} specialties={specialties} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
