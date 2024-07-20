import { useContext } from 'react';
import './TeamComponent.css'
import AuthContext from '../../../contexts/authContext';

export default function TeamCard({ data, delay, personDetails }) {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <div className="col-3">
                <div className="col-lg-12 col-md-6 wow fadeInUp" data-wow-delay={`${delay}ms`}>
                    <div className="team-item position-relative rounded overflow-hidden">
                        <div className="overflow-hidden" data-bs-toggle="tooltip" data-bs-placement="top" title="More info">
                            <img onClick={() => personDetails(data)} className={`img-fluid ${isAuthenticated ? "allowed":"not-allowed"}`} type="btn" data-bs-toggle={isAuthenticated ? "modal": ''} data-bs-target={isAuthenticated ? "#contactInfoModal": ''} src={data.imageUrl} alt="" />
                        </div>
                        <div className="team-text bg-light text-center p-4">
                            <h5>{data.name}</h5>
                            <p className="text-primary">{data.department}</p>
                            <div className="team-social text-center">
                                <a className="btn btn-square" href="">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="btn btn-square" href="">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a className="btn btn-square" href="">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}