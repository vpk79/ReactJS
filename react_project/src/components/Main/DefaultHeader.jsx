import { Link } from "react-router-dom";

export default function DefaultHeader({ title }) {
    return (
        <>
            <div
                className="container-fluid page-header py-5 mb-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">
                       { title }
                    </h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb text-uppercase mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-white">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">
                                    Pages
                                </a>
                            </li>
                            <li
                                className="breadcrumb-item text-primary active"
                                aria-current="page"
                            >
                                { title }
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </>
    )
}