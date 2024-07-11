import React, { useContext } from 'react';
import styles from './Register.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
}


export default function Register() {

    const {registerSubmitHandler } = useContext(AuthContext);
    const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    })

    return (
        <>
            {/* Register */}
            <div

                className="modal fade"
                id="Register"
                tabIndex={-1}
                aria-labelledby="Register"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.register} modal-content`}>
                        <div className={`${styles.registerHeader} modal-header`}>
                            <h5 className="modal-title" id="RegisterLabel">
                                Register
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form className={styles.registerForm} onSubmit={onSubmit}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        name={RegisterFormKeys.Email}
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Email]}
                                        autoComplete="on" />

                                </div>
                            </div>
                            <div className={`${styles.formInputs} row mb-3`}>
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className="form-control"
                                        name={RegisterFormKeys.Password}
                                        id="inputPassword3"
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Password]}
                                        autoComplete="on" />

                                </div>
                                <label htmlFor="ConfirmPassword3" className="col-sm-2 col-form-label">
                                    Re-Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className="form-control"
                                        name={RegisterFormKeys.ConfirmPassword}
                                        id="ConfirmPassword3"
                                        onChange={onChange}
                                        // value={values[RegisterFormKeys.Password]}
                                        autoComplete="on" />

                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnRegister} btn btn-primary`}>
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