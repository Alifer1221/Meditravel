'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicById, getSpecialties, getTestimonialsByClinic } from '@/lib/data';
import LeadForm from '@/components/LeadForm';
import styles from './page.module.css';

export default function ClinicDetailPage() {
    const params = useParams();
    const [clinic, setClinic] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        if (params.id) {
            const c = getClinicById(params.id);
            setClinic(c);
            setSpecialties(getSpecialties());
            setTestimonials(getTestimonialsByClinic(params.id));
        }
    }, [params.id]);

    if (!clinic) {
        return (
            <>
                <Navbar />
                <main className={styles.loading}>
                    <p>Cargando clínica...</p>
                </main>
                <Footer />
            </>
        );
    }

    // Get specialty names for this clinic
    const clinicSpecialties = clinic.specialties
        ? clinic.specialties.map(specId => {
            const spec = specialties.find(s => s.id === specId);
            return spec;
        }).filter(Boolean)
        : [];

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroImage}>
                        <img src={clinic.image} alt={clinic.name} />
                        <div className={styles.heroOverlay}></div>
                    </div>
                    <div className={styles.heroContent}>
                        <Link href="/clinicas" className={styles.backLink}>
                            ← Volver a Clínicas
                        </Link>
                        <div className={styles.rating}>
                            <span className={styles.star}>★</span>
                            <span>{clinic.rating}</span>
                            <span className={styles.reviews}>({clinic.reviews} reseñas)</span>
                        </div>
                        <h1 className={styles.title}>{clinic.name}</h1>
                        <p className={styles.location}>
                            <span className={styles.locationIcon}>📍</span>
                            {clinic.location}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {/* Main Content */}
                            <div className={styles.mainContent}>

                                {/* Lead Form Top */}
                                <LeadForm title={`Contactar a ${clinic.name}`} />

                                {/* Description */}
                                <div className={styles.card}>
                                    <h2>Acerca de la Clínica</h2>
                                    <p>{clinic.fullDescription}</p>
                                </div>

                                {/* Specialties */}
                                {clinicSpecialties.length > 0 && (
                                    <div className={styles.card}>
                                        <h3>Especialidades Disponibles</h3>
                                        <div className={styles.specialtiesList}>
                                            {clinicSpecialties.map((spec) => (
                                                <Link
                                                    key={spec.id}
                                                    href={`/especialidades/${spec.id}`}
                                                    className={styles.specialtyItem}
                                                >
                                                    <img src={spec.image} alt={spec.name} />
                                                    <div>
                                                        <strong>{spec.name}</strong>
                                                        <span>Ver detalles →</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Gallery */}
                                {clinic.images && clinic.images.length > 1 && (
                                    <div className={styles.card}>
                                        <h3>Galería</h3>
                                        <div className={styles.gallery}>
                                            {clinic.images.map((img, index) => (
                                                <div key={index} className={styles.galleryItem}>
                                                    <img src={img} alt={`${clinic.name} - ${index + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Testimonials */}
                                {testimonials.length > 0 && (
                                    <div className={styles.card}>
                                        <h3>Testimonios de Pacientes</h3>
                                        <div className={styles.testimonialsList}>
                                            {testimonials.map((testimonial) => (
                                                <div key={testimonial.id} className={styles.testimonialCard}>
                                                    <p>"{testimonial.testimonial}"</p>
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

                                {/* Lead Form Bottom */}
                                <LeadForm title="¿Listo para agendar?" subtitle="Envíanos tus datos para coordinar una consulta." />
                            </div>

                            {/* Sidebar */}
                            <div className={styles.sidebar}>
                                {/* Contact Card */}
                                <div className={styles.contactCard}>
                                    <h3>Información de Contacto</h3>
                                    {clinic.contact && (
                                        <div className={styles.contactInfo}>
                                            {clinic.contact.phone && (
                                                <a href={`tel:${clinic.contact.phone}`} className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>📞</span>
                                                    <span>{clinic.contact.phone}</span>
                                                </a>
                                            )}
                                            {clinic.contact.email && (
                                                <a href={`mailto:${clinic.contact.email}`} className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>📧</span>
                                                    <span>{clinic.contact.email}</span>
                                                </a>
                                            )}
                                            {clinic.contact.address && (
                                                <div className={styles.contactItem}>
                                                    <span className={styles.contactIcon}>📍</span>
                                                    <span>{clinic.contact.address}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <button className={styles.ctaButton}>
                                        Solicitar Información
                                    </button>
                                </div>

                                {/* Why Choose Card */}
                                <div className={styles.whyCard}>
                                    <h4>¿Por qué elegirnos?</h4>
                                    <ul>
                                        <li>✓ Certificación internacional</li>
                                        <li>✓ Equipo médico de primer nivel</li>
                                        <li>✓ Tecnología de vanguardia</li>
                                        <li>✓ Atención personalizada</li>
                                        <li>✓ Coordinación de viaje incluida</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
