import { useState } from 'react';
import styles from './ServiceCard.module.css';
import ServiceCardFront from './Service-Card-Front';
import ServiceCardBack from './Service-Card-Back';



export default function ServiceCard({ title, icon, info, description, delay  }) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = (event) => {
        event.preventDefault();
        setFlipped(!flipped);
    }
    return (
        <>
            <div className={`col-lg-4 col-md-6 wow fadeInUp ${styles["flip-card-wrapper"]}`} data-wow-delay={`${delay}ms`}>
                <div className={`${styles["service-item"]} ${styles["bg-light"]} rounded h-100 p-5 ${styles["flip-card"]} ${flipped ? styles.flipped : ''}`}>
                    <div className={styles["flip-card-inner"]}>
                        <ServiceCardFront 
                            handleFlip={handleFlip}
                            title={title}
                            icon={icon}
                            info={info}
                            
                        />
                        <ServiceCardBack
                            handleFlip={handleFlip}
                            title={title}
                            icon={icon}
                            description={description}
                        />
                    </div>
                </div>
            </div>
    
        </>
    )
}