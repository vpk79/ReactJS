

export default function ServiceCardBack({ handleFlip, title, icon, description }){
    return(
        <>
            <div className="flip-card-back rounded h-100">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: 65, height: 65 }}>
                    <i className='fa fa-info text-primary fs-4'></i>
                </div>
                <h4 className="mb-3">Info</h4>
                <p className="mb-4">
                    More about {title} services, including benefits, treatments, and procedures.
                </p>
                <a className="btn" href="#" onClick={handleFlip}>
                    <i className="fa fa-minus text-primary me-3"></i>
                    Go Back
                </a>
            </div>
        </>
    )
}