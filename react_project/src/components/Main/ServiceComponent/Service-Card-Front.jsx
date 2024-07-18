import styles from './ServiceCard.module.css'

export default function ServiceCardFront({handleFlip, title, icon, info}){
    return(
        <>
            <div className={`${styles["flip-card-front"]}`}>
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: 65, height: 65 }}>
                    <i className={`${icon} text-primary fs-4`}></i>
                </div>
                <h4 className="mb-3">{title}</h4>
                <p className="mb-4">
                    {info}
                </p>
                <a className={styles.btn} href="#" onClick={handleFlip}>
                    <i className="fa fa-plus text-primary me-3"></i>
                    Read More
                </a>
            </div>
        </>
    )
}