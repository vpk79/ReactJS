import { useState } from 'react';
import './ServiceCard.css';
import ServiceCardFront from './Service-Card-Front';
import ServiceCardBack from './Service-Card-Back';



export default function ServiceCard({ title, icon, info, description  }) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = (event) => {
        event.preventDefault();
        setFlipped(!flipped);
    }
    return (
        <>
            <div className="col-lg-4 col-md-6 wow fadeInUp flip-card-wrapper" data-wow-delay="0.1s">
                <div className={`service-item bg-light rounded h-100 p-5 flip-card ${flipped ? 'flipped' : ''}`}>
                    <div className="flip-card-inner">
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