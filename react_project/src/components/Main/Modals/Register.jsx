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
        console.log('heeee');
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
        } else if (values.password.length <= 5) {
            setPasswordInputError('*password must have 6 symbols at least!')
        }
    }

    const confirmPasswordInputValidator = () => {
        if (values['confirm-password'] === '') {
            setConfirmInputError('*confirm password is required!')
        } else if ((values.password || !values.password) && values.password !== values['confirm-password']) {
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
        } else if (e.target.name === 'confirm-password') {
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

                className={`${styles.registerModal} modal fade`}
                id="Register"
                tabIndex={-1}
                aria-labelledby="Register"
                aria-hidden="true"
                ref={modalRef}

            >
                <div className={`${styles.register} modal-dialog modal-dialog-centered`}>
                    <div className={`${styles.register} modal-content bg-light row`}>
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
                        <h3 style={{ textAlign: 'center', marginTop: '-50px' }} className="form-title" id="RegisterLabel">
                            Register
                        </h3>
                        <form className={`col ${styles.registerForm}`} onSubmit={onSubmit}>
                            <div className={styles.registerWrapper}>
                                <div className={styles.registerLeftSide}>
                                    <div className=' d-flex flex-column'>
                                        <label htmlFor="registerName" className="">
                                            *Name
                                        </label>
                                        <input className='shadow-sm form-control form-control-sm w-75' id="registerName" type="text" />
                                    </div>
                                    <div className=' d-flex flex-column'>
                                        <label htmlFor="registerLastName" className="">
                                            *Last name
                                        </label>
                                        <input className='shadow-sm form-control form-control-sm w-75'  id="registerLastName" type="text" />
                                    </div>
                                   
                                    <div className=' d-flex flex-column'>
                                        <label htmlFor="registerEmail3" className="">
                                            *Email
                                        </label>
                                        <input type="email"
                                            className={`shadow-sm form-control form-control-sm w-75 {${emailInputError ? 'is-invalid' : ''}}`}
                                            id="registerEmail3"
                                            name={RegisterFormKeys.Email}
                                            onChange={onChange}
                                            value={values[RegisterFormKeys.Email]}
                                            autoComplete="on"
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            ref={emailRef} />
                                        {/* {emailInputError && (
                                            <p className={styles.emailError}>{emailInputError}</p>
                                        )} */}
                                   </div>
                                    <div className={` d-flex flex-column`}>
                                        <label htmlFor="registerPassword3" className="">
                                            *Password
                                        </label>
                                        <input type="password"
                                            className={`shadow-sm form-control form-control-sm w-75 {${passwordInputError ? 'is-invalid' : ''}}`}
                                            name={RegisterFormKeys.Password}
                                            id="registerPassword3"
                                            onChange={onChange}
                                            value={values[RegisterFormKeys.Password]}
                                            autoComplete="on"
                                            onFocus={clearErrors}
                                            onBlur={passwordInputValidator} />

                                        {/* {passwordInputError && (
                                            <p className={styles.passwordError}>{passwordInputError}</p>
                                        )} */}
                                    </div>
                                </div>

                                <div className={styles.registerRightSide}>

                                    <div className='d-flex flex-column '>
                                        <label htmlFor="registerPnone" className="">
                                            *Phone number
                                        </label>
                                        <input className='shadow-sm form-control form-control-sm w-75' id="registerPhone" type="tel" />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <label htmlFor="registerCity" className="">
                                            *City
                                        </label>
                                        <input className='shadow-sm form-control form-control-sm w-75' id="registerCity" type="text" />
                                    </div>
                                   
                                    <div className="d-flex w-75">
                                        <div className='d-flex flex-column'>
                                            <label htmlFor="registerBirthDate" className="">
                                                *Birth date
                                            </label>
                                            
                                            <input className='shadow-sm form-control form-control-sm' id="registerBirthDate" type="text" />
                                        </div>

                                        <div className='d-flex flex-column'>
                                            <label htmlFor="registerName" className="">
                                                *Gender
                                            </label>
                                            <select className='shadow-sm form-control form-control-sm ' name="" id="registerGender">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className={` d-flex flex-column`}>
                                        <label htmlFor="ConfirmPassword3" className="">
                                            *Repeat-Password
                                        </label>
                                        <input type="password"
                                            className={`shadow-sm form-control form-control-sm w-75 {${confirmInputError ? 'is-invalid' : ''}}`}
                                            name={RegisterFormKeys.ConfirmPassword}
                                            id="ConfirmPassword3"
                                            onChange={onChange}
                                            value={values[RegisterFormKeys.ConfirmPassword]}
                                            autoComplete="on"
                                            onFocus={clearErrors}
                                            onBlur={confirmPasswordInputValidator} />
                                        {/* {confirmInputError && (
                                            <p className={styles.confirmError}>{confirmInputError}</p>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnRegister} btn btn-primary`}>
                                Register
                            </button>
                            <p style={{ textAlign: 'center', marginTop: '40px' }}>
                                Already have an account?&nbsp;&nbsp;
                                <span><a name="loginLink" style={{ color: 'blue', fontSize: '1.1em', marginBottom: '7px' }} className="btn" data-bs-toggle="modal" data-bs-target="#Login" onClick={closeForm}>Login</a></span></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}