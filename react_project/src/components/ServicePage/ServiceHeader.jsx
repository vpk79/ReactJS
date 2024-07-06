export default function ServiceHeader(){
    return(
        <>
            <div
                className="container-fluid page-header py-5 mb-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">
                        Services
                    </h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb text-uppercase mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-white" href="#">
                                    Home
                                </a>
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
                                Services
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </>
    )
}