import React, { useContext, useEffect, useRef } from 'react';
import styles from './Register.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
}


export default function Register() {

    const {isAuthenticated, registerSubmitHandler } = useContext(AuthContext);
    const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    });


    

    // closing the form when is necessary
    const closeBtnRef = useRef(null);

    function closeForm() {
        closeBtnRef.current.click();
    };

    if (isAuthenticated) closeForm();

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
                            <button
                                id="closeBtn"
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeBtnRef}
                            />
                        </div>
                        <form className={styles.registerForm} onSubmit={onSubmit}>
                            <h3 style={{ textAlign: 'center', marginTop:'-50px'}}  className="form-title" id="RegisterLabel">
                                Register
                            </h3>
                            <div className="row mb-3">
                                <label htmlFor="registerEmail3" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className="form-control"
                                        id="registerEmail3"
                                        name={RegisterFormKeys.Email}
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Email]}
                                        autoComplete="on" />

                                </div>
                            </div>
                            <div className={`${styles.formInputs} row mb-3`}>
                                <label htmlFor="registerPassword3" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className="form-control"
                                        name={RegisterFormKeys.Password}
                                        id="registerPassword3"
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Password]}
                                        autoComplete="on" />

                                </div>
                                <label htmlFor="ConfirmPassword3" className="col-sm-2 col-form-label">
                                    Repeat-Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        style={{ marginTop:'15px'}}
                                        className="form-control"
                                        name={RegisterFormKeys.ConfirmPassword}
                                        id="ConfirmPassword3"
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.ConfirmPassword]}
                                        autoComplete="on" />

                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnRegister} btn btn-primary`}>
                                Register
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginBottom: '-50px' }}>
                            Already have an account?&nbsp;&nbsp;
                            <span><a style={{ color: 'blue', fontSize:'1.1em', marginBottom:'5px' }} className="btn" data-bs-toggle="modal" data-bs-target="#Login" onClick={closeForm}>Login</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}