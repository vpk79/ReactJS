import { useContext } from 'react';
import './TeamComponent.css'
import AuthContext from '../../../contexts/authContext';
import { Link } from 'react-router-dom';

export default function TeamCard({ data, delay, personDetails }) {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <div className="col-3">
                <div className="col-lg-12 col-md-6 wow fadeInUp" data-wow-delay={`${delay}ms`}>
                    <div className="team-item position-relative rounded overflow-hidden">
                        <div className="overflow-hidden" data-bs-toggle="tooltip" data-bs-placement="top" title="More info">
                            <img onClick={() => personDetails(data)}
                            className={`img-fluid ${isAuthenticated ? "allowed":"not-allowed"}`}
                            type="btn"
                            data-bs-toggle={isAuthenticated ? "modal": ''}
                            data-bs-target={isAuthenticated ? "#contactInfoModal": ''} src={data.imageUrl} alt="" />
                        </div>
                        <div className="team-text bg-light text-center p-2">
                            <h5>{data.name}</h5>
                            <p className="text-primary">{data.department}</p>
                            <div className="team-social text-center">
                                <Link to="https://www.facebook.com" target='_blank' className="btn btn-square" >
                                    <i className="fab fa-facebook-f" />
                                </Link>
                                <Link to="https://www.twitter.com" target='_blank' className="btn btn-square" >
                                    <i className="fab fa-twitter" />
                                </Link>
                                <Link to="https://www.instagram.com" target='_blank' className="btn btn-square" >
                                    <i className="fab fa-instagram" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}