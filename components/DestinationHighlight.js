'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './DestinationHighlight.module.css';

export default function DestinationHighlight() {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const cities = [
        {
            name: "Cartagena",
            image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=800&q=80",
            statNumber: "Top 3",
            statLabel: language === 'es' ? "Destino mundial para cirugía estética." : "Global destination for cosmetic surgery.",
            statLabelEn: "Global destination for cosmetic surgery."
        },
        {
            name: "Bogotá",
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80",
            statNumber: "+50",
            statLabel: language === 'es' ? "Clínicas con acreditación internacional." : "Internationally accredited clinics.",
            statLabelEn: "Internationally accredited clinics."
        },
        {
            name: "Medellín",
            image: "https://raw.githubusercontent.com/Alifer1221/imagenes-ciudades/main/freepik__recrea-esta-imagen-con-inteligencia-artificial-que__78702.jpeg",
            statNumber: "#1",
            statLabel: language === 'es' ? "Ciudad más innovadora en salud." : "Most innovative city in healthcare.",
            statLabelEn: "Most innovative city in healthcare."
        },
        {
            name: "Cali",
            image: "https://raw.githubusercontent.com/Alifer1221/imagenes-ciudades/main/freepik__recrea-esta-imagen-con-inteligencia-artificial-que__78703.jpeg",
            statNumber: "45%",
            statLabel: language === 'es' ? "Ahorro en procedimientos dentales complejos." : "Savings on complex dental procedures.",
            statLabelEn: "Savings on complex dental procedures."
        },
        {
            name: "Barranquilla",
            image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80", // Changed to generic Colombia/tropical shot as fallback
            statNumber: "24/7",
            statLabel: language === 'es' ? "Atención VIP y clima tropical todo el año." : "VIP care and tropical weather year-round.",
            statLabelEn: "VIP care and tropical weather year-round."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cities.length);
        }, 6000); // 6 seconds

        return () => clearInterval(interval);
    }, [cities.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cities.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + cities.length) % cities.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    // Multi-Color Icons (Not just blue)
    const IconPlane = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.iconSvg}>
            {/* Orange/Sunset for Adventure/Travel */}
            <path fill="#FB923C" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            <path fill="#C2410C" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" opacity="0.2" />
        </svg>
    );

    const IconWallet = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.iconSvg}>
            {/* Emerald Green for Money/Savings */}
            <path fill="#10B981" d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8z" />
            <circle cx="16" cy="12" r="1.5" fill="#FCD34D" /> {/* Gold Coin */}
        </svg>
    );

    const IconShield = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.iconSvg}>
            {/* Royal Purple for Premium Security/Trust */}
            <path fill="#8B5CF6" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            <path fill="#6D28D9" d="M12 22C6.84 20.74 3 15.55 3 11V5l9-4 9 4v6c0 4.55-3.84 9.74-9 11zm-1-6l-2.5-2.5 1.41-1.41L11 13.17l4.59-4.58L17 10l-6 6z" />
        </svg>
    );

    const content = {
        es: {
            label: "DESTINO PREMIUM",
            title: "Colombia: Potencia Mundial en Salud",
            description: "Descubre por qué miles de pacientes internacionales eligen Colombia cada año. Combinamos tecnología médica de vanguardia con la calidez de nuestra gente y destinos turísticos inolvidables.",
            features: [
                {
                    icon: <IconPlane />,
                    title: "Todo en un solo lugar",
                    text: "Gestionamos tus vuelos, hospedaje, transporte, cirugía y recuperación. Solo preocúpate por sanar."
                },
                {
                    icon: <IconWallet />,
                    title: "Ahorro Inteligente",
                    text: "Ahorra hasta un 70% comparado con costos en EE.UU., sin sacrificar calidad ni seguridad."
                },
                {
                    icon: <IconShield />,
                    title: "Viaja y Vuelve Seguro",
                    text: "Protocolos estrictos, seguro médico internacional y acompañamiento hasta tu regreso a casa."
                }
            ]
        },
        en: {
            label: "PREMIUM DESTINATION",
            title: "Colombia: World-Class Healthcare",
            description: "Discover why thousands of international patients choose Colombia every year. We combine cutting-edge medical technology with the warmth of our people and unforgettable tourist destinations.",
            features: [
                {
                    icon: <IconPlane />,
                    title: "All-in-One Experience",
                    text: "We manage your flights, accommodation, transport, surgery, and recovery. You just focus on healing."
                },
                {
                    icon: <IconWallet />,
                    title: "Smart Savings",
                    text: "Save up to 70% compared to US costs, without sacrificing quality or safety."
                },
                {
                    icon: <IconShield />,
                    title: "Travel & Return Safely",
                    text: "Strict protocols, international medical insurance, and full support until you are back home."
                }
            ]
        }
    };

    const t = content[language];


    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {/* Text Column */}
                    <div className={styles.textContent}>
                        <span className={styles.label}>{t.label}</span>
                        <h2 className={styles.title}>{t.title}</h2>
                        <p className={styles.description}>{t.description}</p>

                        <div className={styles.features}>
                            {t.features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <div className={styles.iconWrapper}>
                                        {feature.icon}
                                    </div>
                                    <div className={styles.featureText}>
                                        <h4>{feature.title}</h4>
                                        <p>{feature.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Column */}
                    <div
                        className={styles.imageWrapper}
                    >
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className={styles.imageContainer}
                                style={{
                                    opacity: index === currentIndex ? 1 : 0,
                                    zIndex: index === currentIndex ? 1 : 0,
                                }}
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className={`${styles.mainImage} ${index === currentIndex ? styles.kenBurns : ''}`}
                                />
                                {/* Stat Card inside the container to sync opacity/transition */}
                                <div className={`${styles.statCard} ${index === currentIndex ? styles.statCardActive : ''}`}>
                                    <span className={styles.cityName} style={{
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        display: 'block',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {city.name}
                                    </span>
                                    <span className={styles.statNumber}>{city.statNumber}</span>
                                    <span className={styles.statLabel}>{language === 'es' ? city.statLabel : city.statLabelEn}</span>
                                </div>
                            </div>
                        ))}

                        {/* Controls */}
                        <button
                            onClick={handlePrev}
                            className={`${styles.navButton} ${styles.prevButton}`}
                            aria-label="Previous"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className={`${styles.navButton} ${styles.nextButton}`}
                            aria-label="Next"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Indicators */}
                        <div className={styles.indicators}>
                            {cities.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`${styles.indicatorDot} ${index === currentIndex ? styles.activeDot : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
