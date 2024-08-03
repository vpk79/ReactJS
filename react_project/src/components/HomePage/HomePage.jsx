import Header from '../Main/HomeHeader'
import About from '../Main/About'
import Feature from '../Main/Feature'
import Appointment from '../Main/Appointment'
import TeamComponent from '../Main/TeamComponent/TeamComponent'
import ServiceComponent from '../Main/ServiceComponent/ServiceComponent'
import Testemonial from '../Main/TestemonialComponent/Testimonial'

export default function HomePage(){
    return(
        <>
            {/* <Header /> */}

            <About />

            <ServiceComponent />

            <Feature />

            <TeamComponent />

            <Appointment />

            <Testemonial />
        </>
    )
}