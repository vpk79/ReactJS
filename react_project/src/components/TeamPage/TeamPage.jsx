import { useContext, useEffect, useState } from "react";
import * as request from "../../lib/request";
import { EMPLOYERS } from "../../const/const";
import TeamCard from "../Main/TeamComponent/TeamCard";
import ContactInfo from "../Main/TeamComponent/ContactInfo";
import AuthContext from "../../contexts/authContext";
import { showInfoToast } from "../../Toasts/toastsMsg";


export default function TeamPage() {
    const [doctors, setDoctors] = useState([]);
    const [personData, setPersonData] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const loadData = async () => {
            const data = await request.get(EMPLOYERS);
            setDoctors(data);
        }
        loadData();

        return (() => {
            setDoctors([]);
        })
    }, [])

    const personDetails = (data) => {
        if (!isAuthenticated) {
            showInfoToast("You must login or register first!", {
                toastId: "login"
            })
            return;
        }
        setPersonData(data);
    };

    return (
        <>
            {/* Team Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 600 }}
                    >
                        <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                        <h1>Our Experience Doctors</h1>
                    </div>
                    <div className="row g-4">
                        {doctors.length > 0 && doctors.map((data, index) =>
                            <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails} />)}
                    </div>
                </div>
                {<ContactInfo data={personData} />}
            </div>
            {/* Team End */}
        </>
    )
}