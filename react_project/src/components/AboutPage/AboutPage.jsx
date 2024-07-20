import { Link } from "react-router-dom";
import About from "../Main/About";
import Feature from "../Main/Feature";
import AboutHeader from "./AboutHeader";
import TeamComponent from "../Main/TeamComponent/TeamComponent";

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
                    <TeamComponent />
                {/* Team End */}

            </>

        </>
    )
}