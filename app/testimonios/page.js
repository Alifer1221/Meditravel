'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import { getTestimonials, getSpecialties, getClinics } from '@/lib/data';
import styles from './page.module.css';

export default function TestimoniosPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        setTestimonials(getTestimonials());
        setSpecialties(getSpecialties());
        setClinics(getClinics());
    }, []);

    const getSpecialtyName = (id) => {
        const spec = specialties.find(s => s.id === id);
        return spec ? spec.name : '';
    };

    const getClinicName = (id) => {
        const clinic = clinics.find(c => c.id === id);
        return clinic ? clinic.name : '';
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Testimonios</span>
                        <h1 className={styles.title}>Lo Que Dicen Nuestros Pacientes</h1>
                        <p className={styles.subtitle}>
                            Miles de pacientes han confiado en nosotros para sus tratamientos médicos.
                            Lee sus experiencias y descubre por qué somos líderes en turismo médico.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className={styles.statsSection}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>98%</span>
                            <span className={styles.statLabel}>Satisfacción</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>10k+</span>
                            <span className={styles.statLabel}>Pacientes</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>4.9</span>
                            <span className={styles.statLabel}>Calificación</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Países</span>
                        </div>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className={styles.testimonialWrapper}>
                                    <TestimonialCard testimonial={testimonial} />
                                    <div className={styles.testimonialMeta}>
                                        {testimonial.specialty && (
                                            <span className={styles.metaItem}>
                                                Especialidad: <strong>{getSpecialtyName(testimonial.specialty)}</strong>
                                            </span>
                                        )}
                                        {testimonial.clinic && (
                                            <span className={styles.metaItem}>
                                                Clínica: <strong>{getClinicName(testimonial.clinic)}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h2>¿Listo para tu Experiencia?</h2>
                        <p>Únete a miles de pacientes satisfechos y descubre la calidad de nuestros servicios.</p>
                        <a href="/clinicas" className={styles.ctaButton}>
                            Explorar Clínicas
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
