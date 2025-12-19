// Manejo de datos con localStorage
// Este archivo contiene funciones CRUD para especialidades, clínicas, artículos y testimonios

// ==========================================
// Datos iniciales de ejemplo
// ==========================================

const specialtiesEN = [
    {
        id: "1",
        name: "Plastic Surgery",
        description: "High-quality aesthetic and reconstructive procedures with internationally certified surgeons.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
        fullDescription: "Our plastic surgery specialty offers a wide range of aesthetic and reconstructive procedures. We have internationally certified surgeons using the most advanced techniques to ensure natural and safe results.",
        procedures: ["Rhinoplasty", "Liposuction", "Breast Augmentation", "Facelift", "Tummy Tuck"]
    },
    {
        id: "2",
        name: "Dentistry",
        description: "Advanced dental treatments including implants, veneers, and smile design.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
        fullDescription: "We offer comprehensive dental services with cutting-edge technology. From regular cleanings to complex procedures like dental implants and smile design.",
        procedures: ["Dental Implants", "Veneers", "Whitening", "Orthodontics", "Smile Design"]
    },
    {
        id: "3",
        name: "Ophthalmology",
        description: "Laser surgery, cataracts, and specialized treatments for visual health.",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800",
        fullDescription: "Center specialized in visual health with state-of-the-art equipment. We perform LASIK laser surgeries, cataract and glaucoma treatments with top specialists.",
        procedures: ["LASIK Surgery", "Cataracts", "Glaucoma", "Retina", "Cornea"]
    },
    {
        id: "4",
        name: "Cardiology",
        description: "Diagnosis and treatment of cardiovascular diseases with state-of-the-art technology.",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
        fullDescription: "Our cardiology department features renowned specialists and advanced diagnostic equipment for the comprehensive treatment of heart diseases.",
        procedures: ["Catheterization", "Echocardiography", "Pacemakers", "Angioplasty", "Holter Monitor"]
    },
    {
        id: "5",
        name: "Orthopedics",
        description: "Surgeries and treatments for bone, joint, and muscle problems.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
        fullDescription: "Specialists in the musculoskeletal system. We offer everything from conservative treatments to joint replacement surgeries using minimally invasive techniques.",
        procedures: ["Knee Replacement", "Hip Replacement", "Arthroscopy", "Spine", "Traumology"]
    },
    {
        id: "6",
        name: "Oncology",
        description: "Comprehensive cancer treatment with personalized therapies and multidisciplinary support.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        fullDescription: "Oncology center with a comprehensive approach combining the latest available therapies, including immunotherapy and personalized medicine, with emotional and nutritional support.",
        procedures: ["Chemotherapy", "Radiotherapy", "Immunotherapy", "Oncologic Surgery", "Personalized Medicine"]
    }
];

const specialtiesES = [
    {
        id: "1",
        name: "Cirugía Plástica",
        description: "Procedimientos estéticos y reconstructivos de la más alta calidad con cirujanos certificados internacionalmente.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
        fullDescription: "Nuestra especialidad en cirugía plástica ofrece una amplia gama de procedimientos estéticos y reconstructivos. Contamos con cirujanos certificados internacionalmente que utilizan las técnicas más avanzadas para garantizar resultados naturales y seguros.",
        procedures: ["Rinoplastia", "Liposucción", "Aumento mamario", "Lifting facial", "Abdominoplastia"]
    },
    {
        id: "2",
        name: "Odontología",
        description: "Tratamientos dentales avanzados incluyendo implantes, carillas y diseño de sonrisa.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
        fullDescription: "Ofrecemos servicios odontológicos integrales con tecnología de punta. Desde limpiezas regulares hasta procedimientos complejos como implantes dentales y diseño de sonrisa.",
        procedures: ["Implantes dentales", "Carillas", "Blanqueamiento", "Ortodoncia", "Diseño de sonrisa"]
    },
    {
        id: "3",
        name: "Oftalmología",
        description: "Cirugía láser, cataratas y tratamientos especializados para la salud visual.",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800",
        fullDescription: "Centro especializado en salud visual con equipos de última generación. Realizamos cirugías láser LASIK, tratamiento de cataratas y glaucoma con los mejores especialistas.",
        procedures: ["Cirugía LASIK", "Cataratas", "Glaucoma", "Retina", "Córnea"]
    },
    {
        id: "4",
        name: "Cardiología",
        description: "Diagnóstico y tratamiento de enfermedades cardiovasculares con tecnología de punta.",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
        fullDescription: "Nuestro departamento de cardiología cuenta con especialistas reconocidos y equipos diagnósticos avanzados para el tratamiento integral de enfermedades del corazón.",
        procedures: ["Cateterismo", "Ecocardiografía", "Marcapasos", "Angioplastia", "Estudio Holter"]
    },
    {
        id: "5",
        name: "Ortopedia",
        description: "Cirugías y tratamientos para problemas óseos, articulares y musculares.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
        fullDescription: "Especialistas en el sistema músculo-esquelético. Ofrecemos desde tratamientos conservadores hasta cirugías de reemplazo articular con técnicas mínimamente invasivas.",
        procedures: ["Reemplazo de rodilla", "Reemplazo de cadera", "Artroscopia", "Columna vertebral", "Traumatología"]
    },
    {
        id: "6",
        name: "Oncología",
        description: "Tratamiento integral del cáncer con terapias personalizadas y apoyo multidisciplinario.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        fullDescription: "Centro oncológico con enfoque integral que combina las últimas terapias disponibles, incluyendo inmunoterapia y medicina personalizada, con apoyo emocional y nutricional.",
        procedures: ["Quimioterapia", "Radioterapia", "Inmunoterapia", "Cirugía oncológica", "Medicina personalizada"]
    }
];

const clinicsEN = [
    {
        id: "1",
        name: "Hospital del Mar",
        description: "Leading teaching hospital with JCI accreditation.",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?w=800",
        location: "Barcelona, Spain",
        accreditation: "JCI Accreditation",
        specialties: ["1", "2", "3", "4"],
        rating: 4.9,
        reviews: 320,
        fullDescription: "Hospital del Mar is a reference in medical care in Barcelona, offering state-of-the-art technology and a privileged location by the sea.",
        contact: {
            phone: "+34 93 248 30 00",
            email: "info@hospitaldelmar.cat",
            address: "Passeig Marítim 25, Barcelona"
        },
        images: [
            "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?w=800",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
        ]
    },
    {
        id: "2",
        name: "Clínica de la Paz",
        description: "Specialized private care with ISO certification.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
        location: "Madrid, Spain",
        accreditation: "ISO Certified",
        specialties: ["1", "2"],
        rating: 4.8,
        reviews: 245,
        fullDescription: "Clínica de la Paz stands out for its excellence in patient care and its rigorous quality standards.",
        contact: {
            phone: "+34 91 123 45 67",
            email: "contacto@lapaz.es",
            address: "Calle de la Paz 10, Madrid"
        },
        images: [
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800"
        ]
    },
    {
        id: "3",
        name: "Centro Médico Aurora",
        description: "Excellence in diverse medical specialties.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
        location: "Lisbon, Portugal",
        accreditation: "Quality Care Award",
        specialties: ["1", "3", "5"],
        rating: 4.7,
        reviews: 189,
        fullDescription: "Centro Médico Aurora provides comprehensive medical services with a focus on patient well-being and recovery.",
        contact: {
            phone: "+351 21 123 4567",
            email: "info@aurora.pt",
            address: "Av. da Liberdade 100, Lisboa"
        },
        images: [
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
        ]
    },
    {
        id: "4",
        name: "Clinique Santé",
        description: "Advanced diagnostic center and surgery.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0833860?w=800",
        location: "Paris, France",
        accreditation: "HAS Certified",
        specialties: ["2", "4"],
        rating: 4.8,
        reviews: 156,
        fullDescription: "Clinique Santé offers premium medical services in the heart of Paris, specializing in minimally invasive surgery.",
        contact: {
            phone: "+33 1 23 45 67 89",
            email: "contact@cliniquesante.fr",
            address: "123 Rue de la Santé, Paris"
        },
        images: [
            "https://images.unsplash.com/photo-1516549655169-df83a0833860?w=800",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
        ]
    },
    {
        id: "5",
        name: "Nordic Health Center",
        description: "Holistic approach to patient recovery.",
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800",
        location: "Stockholm, Sweden",
        accreditation: "Nordic Quality",
        specialties: ["1", "5"],
        rating: 4.9,
        reviews: 201,
        fullDescription: "Nordic Health Center combines modern medicine with a holistic approach for optimal patient recovery.",
        contact: {
            phone: "+46 8 123 45 67",
            email: "info@nordichealth.se",
            address: "Healthvägen 1, Stockholm"
        },
        images: [
            "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800"
        ]
    },
    {
        id: "6",
        name: "Berlin Medical Institute",
        description: "Cutting-edge research and treatment.",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
        location: "Berlin, Germany",
        accreditation: "ISO 9001",
        specialties: ["3", "4", "5"],
        rating: 4.9,
        reviews: 412,
        fullDescription: "Berlin Medical Institute is at the forefront of medical research and treatment, offering innovative therapies.",
        contact: {
            phone: "+49 30 12345678",
            email: "kontakt@bmi-berlin.de",
            address: "Medizinalstraße 10, Berlin"
        },
        images: [
            "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
        ]
    }
];

const clinicsES = [
    {
        id: "1",
        name: "Hospital del Mar",
        description: "Hospital universitario de referencia con acreditación JCI.",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?w=800",
        location: "Barcelona, España",
        accreditation: "Acreditación JCI",
        specialties: ["1", "2", "3", "4"],
        rating: 4.9,
        reviews: 320,
        fullDescription: "El Hospital del Mar es un referente en atención médica en Barcelona, ofreciendo tecnología de punta y una ubicación privilegiada junto al mar.",
        contact: {
            phone: "+34 93 248 30 00",
            email: "info@hospitaldelmar.cat",
            address: "Passeig Marítim 25, Barcelona"
        },
        images: [
            "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?w=800",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
        ]
    },
    {
        id: "2",
        name: "Clínica de la Paz",
        description: "Atención privada especializada con certificación ISO.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
        location: "Madrid, España",
        accreditation: "Certificado ISO",
        specialties: ["1", "2"],
        rating: 4.8,
        reviews: 245,
        fullDescription: "La Clínica de la Paz destaca por su excelencia en el trato al paciente y sus rigurosos estándares de calidad.",
        contact: {
            phone: "+34 91 123 45 67",
            email: "contacto@lapaz.es",
            address: "Calle de la Paz 10, Madrid"
        },
        images: [
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800"
        ]
    },
    {
        id: "3",
        name: "Centro Médico Aurora",
        description: "Excelencia en diversas especialidades médicas.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
        location: "Lisboa, Portugal",
        accreditation: "Quality Care Award",
        specialties: ["1", "3", "5"],
        rating: 4.7,
        reviews: 189,
        fullDescription: "Centro Médico Aurora ofrece servicios médicos integrales con un enfoque en el bienestar y la recuperación del paciente.",
        contact: {
            phone: "+351 21 123 4567",
            email: "info@aurora.pt",
            address: "Av. da Liberdade 100, Lisboa"
        },
        images: [
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
        ]
    },
    {
        id: "4",
        name: "Clinique Santé",
        description: "Centro de diagnóstico avanzado y cirugía.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0833860?w=800",
        location: "París, Francia",
        accreditation: "Certificado HAS",
        specialties: ["2", "4"],
        rating: 4.8,
        reviews: 156,
        fullDescription: "Clinique Santé ofrece servicios médicos premium en el corazón de París, especializándose en cirugía mínimamente invasiva.",
        contact: {
            phone: "+33 1 23 45 67 89",
            email: "contact@cliniquesante.fr",
            address: "123 Rue de la Santé, París"
        },
        images: [
            "https://images.unsplash.com/photo-1516549655169-df83a0833860?w=800",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
        ]
    },
    {
        id: "5",
        name: "Nordic Health Center",
        description: "Enfoque holístico para la recuperación del paciente.",
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800",
        location: "Estocolmo, Suecia",
        accreditation: "Calidad Nórdica",
        specialties: ["1", "5"],
        rating: 4.9,
        reviews: 201,
        fullDescription: "Nordic Health Center combina la medicina moderna con un enfoque holístico para la recuperación óptima del paciente.",
        contact: {
            phone: "+46 8 123 45 67",
            email: "info@nordichealth.se",
            address: "Healthvägen 1, Estocolmo"
        },
        images: [
            "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800"
        ]
    },
    {
        id: "6",
        name: "Instituto Médico de Berlín",
        description: "Investigación y tratamiento de vanguardia.",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
        location: "Berlín, Alemania",
        accreditation: "ISO 9001",
        specialties: ["3", "4", "5"],
        rating: 4.9,
        reviews: 412,
        fullDescription: "El Instituto Médico de Berlín está a la vanguardia de la investigación y el tratamiento médico, ofreciendo terapias innovadoras.",
        contact: {
            phone: "+49 30 12345678",
            email: "kontakt@bmi-berlin.de",
            address: "Medizinalstraße 10, Berlín"
        },
        images: [
            "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
        ]
    }
];

const articlesEN = [
    {
        id: "1",
        title: "5 Reasons to Choose Medical Tourism",
        excerpt: "Discover why more people are choosing to travel for quality healthcare.",
        content: "Medical tourism has grown exponentially in recent years. Main reasons include: more affordable costs, reduced wait times, access to world-renowned specialists, the opportunity to combine treatment with recovery in tourist destinations, and availability of cutting-edge technology in international medical centers.",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
        author: "Dr. Maria Gonzalez",
        date: "2024-01-15",
        category: "Guides"
    },
];

const articlesES = [
    {
        id: "1",
        title: "5 Razones para Elegir el Turismo Médico",
        excerpt: "Descubre por qué cada vez más personas eligen viajar para recibir atención médica de calidad.",
        content: "El turismo médico ha crecido exponencialmente en los últimos años. Las principales razones incluyen: costos más accesibles, tiempos de espera reducidos, acceso a especialistas de renombre mundial, la oportunidad de combinar tratamiento con recuperación en destinos turísticos, y la disponibilidad de tecnología de punta en centros médicos internacionales.",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
        author: "Dra. María González",
        date: "2024-01-15",
        category: "Guías"
    },
];

const testimonialsEN = [
    {
        id: "1",
        name: "Jennifer Williams",
        country: "USA",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        testimonial: "My experience was amazing. The medical team was professional and attentive. The cost was a fraction of what I would have paid at home, and the results exceeded my expectations.",
        rating: 5,
        rating: 5,
        specialty: "1",
        clinic: "1"
    }
];
const testimonialsES = [
    {
        id: "1",
        name: "Jennifer Williams",
        country: "Estados Unidos",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        testimonial: "Mi experiencia fue increíble. El equipo médico fue profesional y atento. El costo fue una fracción de lo que habría pagado en casa, y los resultados superaron mis expectativas.",
        rating: 5,
        specialty: "1",
        clinic: "1"
    }
];

// ==========================================
// Funciones de Utilidad
// ==========================================

const STORAGE_KEYS = {
    specialties: 'medictravel_specialties',
    clinics: 'medictravel_clinics',
    articles: 'medictravel_articles',
    testimonials: 'medictravel_testimonials'
};

function getFromStorage(key, defaultData) {
    if (typeof window === 'undefined') return defaultData;
    // For this implementation, we will prioritise defaultData to ensure language switching works,
    // as localStorage doesn't store separate languages in this simple implementation
    return defaultData;
}

// ==========================================
// Especialidades CRUD
// ==========================================

export function getSpecialties(lang = 'en') {
    return lang === 'es' ? specialtiesES : specialtiesEN;
}

export function getSpecialtyById(id, lang = 'en') {
    const specialties = getSpecialties(lang);
    return specialties.find(s => s.id === id);
}

// ==========================================
// Clínicas CRUD
// ==========================================

export function getClinics(lang = 'en') {
    return lang === 'es' ? clinicsES : clinicsEN;
}

export function getClinicById(id, lang = 'en') {
    const clinics = getClinics(lang);
    return clinics.find(c => c.id === id);
}

// ==========================================
// Artículos CRUD
// ==========================================

export function getArticles(lang = 'en') {
    return lang === 'es' ? articlesES : (articlesEN.length > 0 ? articlesEN : articlesES);
}

export function getArticleById(id, lang = 'en') {
    const articles = getArticles(lang);
    return articles.find(a => a.id === id);
}

// ==========================================
// Testimonios CRUD
// ==========================================

export function getTestimonials(lang = 'en') {
    return lang === 'es' ? testimonialsES : (testimonialsEN.length > 0 ? testimonialsEN : testimonialsES);
}

export function getTestimonialById(id, lang = 'en') {
    const testimonials = getTestimonials(lang);
    return testimonials.find(t => t.id === id);
}

export function getTestimonialsByClinic(clinicId, lang = 'en') {
    const testimonials = getTestimonials(lang);
    return testimonials.filter(t => t.clinic === clinicId);
}

export function getClinicsBySpecialty(specialtyId, lang = 'en') {
    const clinics = getClinics(lang);
    return clinics.filter(c => c.specialties && c.specialties.includes(specialtyId));
}

export function getTestimonialsBySpecialty(specialtyId, lang = 'en') {
    const testimonials = getTestimonials(lang);
    return testimonials.filter(t => t.specialty === specialtyId);
}

// Dummy CRUD functions for Admin pages (to fix build errors)
export function addClinic(data) { console.log('addClinic', data); }
export function updateClinic(id, data) { console.log('updateClinic', id, data); }
export function deleteClinic(id) { console.log('deleteClinic', id); }

export function addSpecialty(data) { console.log('addSpecialty', data); }
export function updateSpecialty(id, data) { console.log('updateSpecialty', id, data); }
export function deleteSpecialty(id) { console.log('deleteSpecialty', id); }

export function addArticle(data) { console.log('addArticle', data); }
export function updateArticle(id, data) { console.log('updateArticle', id, data); }
export function deleteArticle(id) { console.log('deleteArticle', id); }

export function addTestimonial(data) { console.log('addTestimonial', data); }
export function updateTestimonial(id, data) { console.log('updateTestimonial', id, data); }
export function deleteTestimonial(id) { console.log('deleteTestimonial', id); }
