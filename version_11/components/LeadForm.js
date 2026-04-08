import styles from './LeadForm.module.css';

export default function LeadForm({ title = "Solicitar Información", subtitle = "Déjanos tus datos y te contactaremos a la brevedad." }) {
    return (
        <div className={styles.formContainer}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>

            <form className={styles.form} onClick={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="Nombre completo" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                    <input type="email" placeholder="Correo electrónico" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                    <input type="tel" placeholder="Teléfono / WhatsApp" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                    <textarea placeholder="¿En qué tratamiento estás interesado?" className={styles.textarea} required></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Enviar Solicitud
                </button>
            </form>
        </div>
    );
}
