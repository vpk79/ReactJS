import { Link } from "react-router-dom";
import About from "../Main/About";
import Feature from "../Main/Feature";
import Team from "../Main/Team";
import AboutHeader from "./AboutHeader";

export default function AboutPage() {
    return (
        <>
            <>
                {/* Page Header Start */}
                    {/* <AboutHeader /> */}
                {/* Page Header End */}

                {/* About Start */}
                    <About />
                {/* About End */}

                {/* Feature Start */}
                    <Feature />
                {/* Feature End */}

                {/* Team Start */}
                    <Team />
                {/* Team End */}

            </>

        </>
    )
}