import styles from './Login.module.css';
import useForm from '../../../hooks/useForm';


export default function Login() {

    const { values, onChange, onSubmit } = useForm({
        email: '',
        password: ''
    });

    return (
        <>
            {/* Login */}
            <div

                className="modal fade"
                id="Login"
                tabIndex={-1}
                aria-labelledby="Login"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.login} modal-content`}>
                        <div className={`${styles.loginHeader} modal-header`}>
                            <h5 className="modal-title" id="LoginLabel">
                                Login
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form className={styles.loginForm} onSubmit={onSubmit}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        onChange={onChange}
                                        value={values.email} />
                                </div>
                            </div>
                            <div className={`${styles.formInputs} row mb-3`}>
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className="form-control"
                                        id="inputPassword3"
                                        onChange={onChange}
                                        value={values.password} />
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnLogin} btn btn-primary`}>
                                Sign in
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginTop: '-50px', marginBottom: '-40px' }}>Not have an account?&nbsp;&nbsp;<span><a className="btn" data-bs-toggle="modal"
                            data-bs-target="#RegisterModal">Register</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}