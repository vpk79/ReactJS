import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Login.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';
import { emailValidator, loginValidator } from '../../../services/validators';


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}


export default function Login() {

    const { isAuthenticated, loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit, setValues } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });

    const [loginInputError, setLoginInputError] = useState('');
    const [passwordInputError, setPasswordInputError] = useState('');


    // closing the form when is necessary
    const closeBtnRef = useRef(null);

    function formReset() {
        setValues({
            [LoginFormKeys.Email]: '',
            [LoginFormKeys.Password]: ''
        });
    }

    function closeForm() {
        try {
            formReset();
            if (closeBtnRef.current) {
                setLoginInputError('');
                setPasswordInputError('');
                closeBtnRef.current.click();
            };
        } catch (error) {
            console.error('Error closing form:', error);
            return null;
        }
    };


    useEffect(() => {
        if (isAuthenticated) {
            closeForm();
        }
    }, [isAuthenticated]);

    // focus on email field when is shown
    const emailRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleShown = () => {
            if (emailRef.current) {
                emailRef.current.focus();
            }
        };

        const modalElement = modalRef.current;
        if (modalElement) {
            modalElement.addEventListener('shown.bs.modal', handleShown);
        }

        // Cleanup the event listener on component unmount
        return () => {

            if (modalElement) {
                modalElement.removeEventListener('shown.bs.modal', handleShown);
            }
        };
    }, []);

    const loginInputValidator = () => {
        if (values.email === '') {
            setLoginInputError('*email is required!')
        } else if (!emailValidator(values.email)) {
            setLoginInputError('*email is not valid!')
        }
    }

    const passwordInputValidator = () => {
        if (values.password === '') {
            setPasswordInputError('*password is required')
        } else if (values.password.length <= 8) {
            setPasswordInputError('*password must have 8 symbols at least')
        }
    }

    const clearErrors = (e) => {
        // console.log(e.target.name);
        if (e.target.name === 'email') {
            setLoginInputError('');
        } else if (e.target.name === 'password') {
            setPasswordInputError('');
        } else if (e.target.name === 'closeBtn') {
            setLoginInputError('');
            setPasswordInputError('');
        }
    }

    return (

        <>
            {/* Login */}
            <div

                className="modal fade"
                id="Login"
                tabIndex={-1}
                aria-labelledby="Login"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.login} modal-content`}>
                        <div className={`${styles.loginHeader} modal-header`}>

                            <button
                                id='closeBtn2'
                                type="button"
                                className="btn-close"
                                name="closeBtn"
                                onClick={clearErrors}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeBtnRef}
                            />
                        </div>
                        <form className={styles.loginForm} onSubmit={onSubmit}>
                            <h3 style={{ textAlign: 'center', marginTop: '-50px' }} className="form-title" id="LoginLabel">
                                Login
                            </h3>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    *Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className={`form-control ${loginInputError ? 'is-invalid' : ''}`}
                                        id="inputEmail3"
                                        name={LoginFormKeys.Email}
                                        onChange={onChange}
                                        value={values[LoginFormKeys.Email]}
                                        autoComplete="on"
                                        onBlur={loginInputValidator}
                                        onFocus={clearErrors}
                                        ref={emailRef} />
                                    {loginInputError && (
                                        <p className={styles.loginError}>{loginInputError}</p>
                                    )}

                                </div>
                            </div>
                            <div className={`${styles.formInputs} row mb-3`}>
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                    *Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className={`form-control ${passwordInputError ? 'is-invalid' : ''}`}
                                        name={LoginFormKeys.Password}
                                        id="inputPassword3"
                                        onChange={onChange}
                                        value={values[LoginFormKeys.Password]}
                                        onFocus={clearErrors}
                                        onBlur={passwordInputValidator}
                                        autoComplete="on" />
                                    {passwordInputError && (
                                        <p className={styles.passwordError}>{passwordInputError}</p>
                                    )}

                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnLogin} btn btn-primary`}>
                                Sign in
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginTop: '-50px', marginBottom: '-40px' }}>
                            Not have an account?&nbsp;&nbsp;<span>
                                <a style={{ color: 'blue', fontSize: '1.1em', marginBottom: '5px' }} className="btn" data-bs-toggle="modal"
                                    data-bs-target="#Register" onClick={closeForm}>Register</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}