import UserProfileHeader from "./UserProfileHeader";


export function UserProfile(){
    return(
        <>  
                {/* <UserProfileHeader /> */}

            <div className="container-xxl py-5">
                <div className="container border">
                    <div className="row g-5 justify-content-center">
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="profile-image-wrapper border bg-light">
                                <img src="../../../public/img/user_profile.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="w-200 h-200 border bg-light">
                                <h3>Here are my data</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}