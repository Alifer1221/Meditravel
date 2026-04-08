import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ testimonial }) {
    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className={styles.card}>
            <div className={styles.quote}>"</div>

            <p className={styles.testimonial}>{testimonial.testimonial}</p>

            <div className={styles.rating}>
                {renderStars(testimonial.rating)}
            </div>

            <div className={styles.author}>
                <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className={styles.avatar}
                />
                <div className={styles.info}>
                    <h4 className={styles.name}>{testimonial.name}</h4>
                    <p className={styles.country}>
                        <span className={styles.flag}>🌍</span>
                        {testimonial.country}
                    </p>
                </div>
            </div>
        </div>
    );
}
