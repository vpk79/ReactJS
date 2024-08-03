import { Link } from "react-router-dom";
import Appointment from "../Main/Appointment";
import ServiceHeader from "./ServiceHeader";
import ServiceComponent from "../Main/ServiceComponent/ServiceComponent";
import Testemonial from "../Main/TestemonialComponent/Testimonial";

export default function ServicePage() {
    return (
        <>
            <>
                {/* Page Header Start */}
                {/* <ServiceHeader /> */}
                {/* Page Header End */}

                {/* Service Start */}
                <ServiceComponent />
                {/* Service End */}

                {/* Appointment Start */}
                <Appointment />
                {/* Appointment End */}

                {/* Testimonial Start */}
                <Testemonial />
                {/* Testimonial End */}

            </>

        </>
    )
}