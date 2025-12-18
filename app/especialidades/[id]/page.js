'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClinicCard from '@/components/ClinicCard';
import { getSpecialtyById, getSpecialties, getClinicsBySpecialty, getTestimonialsBySpecialty } from '@/lib/data';
import LeadForm from '@/components/LeadForm';
import styles from './page.module.css';

export default function SpecialtyDetailPage() {
    const params = useParams();
    const [specialty, setSpecialty] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        if (params.id) {
            const spec = getSpecialtyById(params.id);
            setSpecialty(spec);
            setSpecialties(getSpecialties());
            setClinics(getClinicsBySpecialty(params.id));
            setTestimonials(getTestimonialsBySpecialty(params.id));
        }
    }, [params.id]);

    if (!specialty) {
        return (
            <>
                <Navbar />
                <main className={styles.loading}>
                    <p>Cargando especialidad...</p>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroImage}>
                        <img src={specialty.image} alt={specialty.name} />
                        <div className={styles.heroOverlay}></div>
                    </div>
                    <div className={styles.heroContent}>
                        <Link href="/especialidades" className={styles.backLink}>
                            ← Volver a Especialidades
                        </Link>
                        <h1 className={styles.title}>{specialty.name}</h1>
                        <p className={styles.subtitle}>{specialty.description}</p>
                    </div>
                </section>

                {/* Content */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.content}>

                            {/* Lead Form Top */}
                            <LeadForm title={`Cotiza tu tratamiento de ${specialty.name}`} />

                            {/* Description */}
                            <div className={styles.description}>
                                <h2>Acerca de esta Especialidad</h2>
                                <p>{specialty.fullDescription}</p>
                            </div>

                            {/* Procedures */}
                            {specialty.procedures && specialty.procedures.length > 0 && (
                                <div className={styles.procedures}>
                                    <h3>Procedimientos Disponibles</h3>
                                    <div className={styles.proceduresList}>
                                        {specialty.procedures.map((procedure, index) => (
                                            <div key={index} className={styles.procedureItem}>
                                                <span className={styles.procedureIcon}>✓</span>
                                                {procedure}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Clinics */}
                            {clinics.length > 0 && (
                                <div className={styles.clinicsSection}>
                                    <h3>Clínicas que Ofrecen esta Especialidad</h3>
                                    <div className={styles.clinicsGrid}>
                                        {clinics.map((clinic) => (
                                            <ClinicCard key={clinic.id} clinic={clinic} specialties={specialties} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Testimonials */}
                            {testimonials.length > 0 && (
                                <div className={styles.testimonialsSection}>
                                    <h3>Testimonios de Pacientes</h3>
                                    <div className={styles.testimonialsList}>
                                        {testimonials.map((testimonial) => (
                                            <div key={testimonial.id} className={styles.testimonialCard}>
                                                <p className={styles.testimonialText}>"{testimonial.testimonial}"</p>
                                                <div className={styles.testimonialAuthor}>
                                                    <img src={testimonial.photo} alt={testimonial.name} />
                                                    <div>
                                                        <strong>{testimonial.name}</strong>
                                                        <span>{testimonial.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA & Bottom Lead Form */}
                            <div className={styles.cta}>
                                <h3>¿Interesado en esta especialidad?</h3>
                                <p>Contáctanos para recibir más información y una cotización personalizada.</p>
                                <LeadForm title="Agendar Consulta" subtitle="Completa el formulario y te ayudaremos a coordinar tu cita." />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
