import React, { useEffect, useState } from 'react';
import * as urls from '../../../const/const.js';
import * as request from '../../../lib/request.js'
import ServiceCard from './ServiceCard.jsx';

export default function ServiceComponent(){
   const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
       const getData = request.get(urls.SERVICES)
            .then(data => setServiceData(data))
            .catch(err => console.log(err))
    }, []);
    
    return (
        <>
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 600 }}
                    >
                        <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
                        <h1>Health Care Solutions</h1>
                    </div>
                    <div className="row g-4">

                        {serviceData.map((data, index) => (
                            <ServiceCard
                                key={data._id}
                                title={data.title}
                                icon={data.icon}
                                info={data.info}
                                description={data.description}
                                delay={index * 200}

                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Service End */}
        </>
    )
}