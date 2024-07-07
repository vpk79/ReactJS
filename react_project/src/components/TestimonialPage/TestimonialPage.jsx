import { Link } from "react-router-dom";
import Testemonial from "../Main/Testimonial";
import TestemonialHeader from "./TestemonialHeader";

export default function TestimonialPage() {
    return (
        <>
            <>
                {/* Page Header Start */}
                    <TestemonialHeader />
                {/* Page Header End */}

                {/* Testimonial Start */}
                    <Testemonial />
                {/* Testimonial End */}

            </>

        </>
    )
}