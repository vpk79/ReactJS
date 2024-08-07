import { Link } from "react-router-dom";
import AppointmentHeader from "./AppointmentHeader";
import Appointment from "../Main/AppointmentComponent/Appointment";

export default function AppointmentPage() {
    return (

        <>

            {/* Page Header Start */}
                {/* <AppointmentHeader /> */}
            {/* Page Header End */}

            {/* Appointment Start */}
           <Appointment />
            {/* Appointment End */}
           
        </>



    )
}