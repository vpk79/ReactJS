import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Register.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';
import { emailValidator } from '../../../services/validators';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
}


export default function Register() {

    const { isAuthenticated, registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit, setValues } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    });

    const [emailInputError, setEmailInputError] = useState('');
    const [passwordInputError, setPasswordInputError] = useState('');
    const [confirmInputError, setConfirmInputError] = useState('');
    const [touched, setTouched] = useState(false); // handle out of focus for email input - not show unnecessary errors


    function formReset() {
        setEmailInputError('');
        setPasswordInputError('');
        setConfirmInputError('');
        setTouched(false);
        setValues({
            [RegisterFormKeys.Email]: '',
            [RegisterFormKeys.Password]: '',
            [RegisterFormKeys.ConfirmPassword]: ''
        });
    }

    // closing the form when is necessary
    const closeBtnRef = useRef(null);

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
            setPasswordInputError('*password is required!')
        } else if (values.password.length <= 7) {
            setPasswordInputError('*password must have 8 symbols at least!')
        }
    }

    const confirmPasswordInputValidator = () => {
        if(values['confirm-password'] === ''){
            setConfirmInputError('*confirm password is required!')
        } else if((values.password || !values.password) && values.password !== values['confirm-password']){
            setConfirmInputError('*passwords did not match!')

        }
    }

    const clearErrors = (e) => {
        // console.log(e.target.name);
        if (e.target.name === 'email') {
            setEmailInputError('');
            setTouched(false);
        } else if (e.target.name === 'password') {
            setPasswordInputError('');
        } else if (e.target.name === 'confirm-password'){
            setConfirmInputError('');
        }
         else if (e.target.name === 'closeBtn') {
            setEmailInputError('');
            setPasswordInputError('');
            setConfirmInputError('');
            setTouched(false);
        }
    }



    return (
        <>
            {/* Register */}
            <div

                className="modal fade"
                id="Register"
                tabIndex={-1}
                aria-labelledby="Register"
                aria-hidden="true"
                ref={modalRef}

            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.register} modal-content`}>
                        <div className={`${styles.registerHeader} modal-header`}>
                            <button
                                id="closeBtn"
                                type="button"
                                className="btn-close"
                                name="closeBtn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={formReset}
                                ref={closeBtnRef}
                            />
                        </div>
                        <form className={styles.registerForm} onSubmit={onSubmit}>
                            <h3 style={{ textAlign: 'center', marginTop: '-50px' }} className="form-title" id="RegisterLabel">
                                Register
                            </h3>
                            <div className="row mb-3">
                                <label htmlFor="registerEmail3" className="col-sm-2 col-form-label">
                                    *Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className={`form-control ${emailInputError ? 'is-invalid' : ''}`}
                                        id="registerEmail3"
                                        name={RegisterFormKeys.Email}
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Email]}
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
                                <label htmlFor="registerPassword3" className="col-sm-2 col-form-label">
                                    *Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        className={`form-control ${passwordInputError ? 'is-invalid' : ''}`}
                                        name={RegisterFormKeys.Password}
                                        id="registerPassword3"
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.Password]}
                                        autoComplete="on"
                                        onFocus={clearErrors}
                                        onBlur={passwordInputValidator} />

                                    {passwordInputError && (
                                        <p className={styles.passwordError}>{passwordInputError}</p>
                                    )}
                                </div>
                                <label htmlFor="ConfirmPassword3" className="col-sm-2 col-form-label">
                                    *Repeat-Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password"
                                        style={{ marginTop: '15px' }}
                                        className={`form-control ${confirmInputError ? 'is-invalid' : ''}`}
                                        name={RegisterFormKeys.ConfirmPassword}
                                        id="ConfirmPassword3"
                                        onChange={onChange}
                                        value={values[RegisterFormKeys.ConfirmPassword]}
                                        autoComplete="on"
                                        onFocus={clearErrors}
                                        onBlur={confirmPasswordInputValidator} />
                                    {confirmInputError && (
                                        <p className={styles.confirmError}>{confirmInputError}</p>
                                    )}
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnRegister} btn btn-primary`}>
                                Register
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginBottom: '-50px' }}>
                            Already have an account?&nbsp;&nbsp;
                            <span><a name="loginLink" style={{ color: 'blue', fontSize: '1.1em', marginBottom: '5px' }} className="btn" data-bs-toggle="modal" data-bs-target="#Login" onClick={closeForm}>Login</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}