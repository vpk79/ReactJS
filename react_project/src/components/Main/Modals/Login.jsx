import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Login.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';
import { emailValidator } from '../../../services/validators';


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

    const [emailInputError, setEmailInputError] = useState('');
    const [passwordInputError, setPasswordInputError] = useState('');
    const [touched, setTouched] = useState(false); // handle out of focus for email input - not show unnecessary errors


    // closing the form when is necessary
    const closeBtnRef = useRef(null);

    function formReset() {
        setEmailInputError('');
        setPasswordInputError('');
        setTouched(false);
        setValues({
            [LoginFormKeys.Email]: '',
            [LoginFormKeys.Password]: ''
        });
    }

    function closeForm() {
        try {
            formReset();
            if (closeBtnRef.current) {
                closeBtnRef.current.click();
            };
        } catch (error) {
            console.error('Error closing form:', error);
            return null;
        }
    };

    // close the form when login is successfull
    useEffect(() => {
        if (isAuthenticated) {
            closeForm();
        }
    }, [isAuthenticated]);


    // focus on email field when the form is shown
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

    const handleBlur = () => {
        setTouched(true);
    };

    // input validators
    useEffect(() => {
        if (!touched) return;
        const timeoutId = setTimeout(() => {
            if (values.email === '') {
                setEmailInputError('*email is required!');
            } else if (!emailValidator(values.email)) {
                setEmailInputError('*email is not valid!');
            } else {
                setEmailInputError('');
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [touched]);

    const passwordInputValidator = () => {
        if (values.password === '') {
            setPasswordInputError('*password is required')
        }
    }

    const clearErrors = (e) => {
        // console.log(e.target.name);
        if (e.target.name === 'email') {
            setEmailInputError('');
            setTouched(false);
        } else if (e.target.name === 'password') {
            setPasswordInputError('');
        } else if (e.target.name === 'closeBtn') {
            setEmailInputError('');
            setPasswordInputError('');
            setTouched(false);
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
                                        className={`form-control ${emailInputError ? 'is-invalid' : ''}`}
                                        id="inputEmail3"
                                        name={LoginFormKeys.Email}
                                        onChange={onChange}
                                        value={values[LoginFormKeys.Email]}
                                        autoComplete="on"
                                        onBlur={handleBlur}
                                        onFocus={clearErrors}
                                        ref={emailRef} />
                                    {emailInputError && (
                                        <p className={styles.emailError}>{emailInputError}</p>
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
                                <a name="registerLink" style={{ color: 'blue', fontSize: '1.1em', marginBottom: '5px' }} className="btn" data-bs-toggle="modal"
                                    data-bs-target="#Register" onClick={closeForm}>Register</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}