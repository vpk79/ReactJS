import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Register.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';
import { emailValidator, validatorHandler } from '../../../services/validators';
import { showErrorToast } from '../../../Toasts/toastsMsg';

const RegisterFormKeys = {
    Name: 'Name',
    LastName: 'LastName',
    Phone: 'Phone',
    City: 'City',
    BirthDate: 'Birthdate',
    Gender: 'Gender',
    Email: 'Email',
    Password: 'Password',
    ConfirmPassword: 'ConfirmPassword'
}


export default function Register() {

    const { isAuthenticated, registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit, setValues } = useForm(registerSubmitHandler, {

        [RegisterFormKeys.Name]: '',
        [RegisterFormKeys.LastName]: '',
        [RegisterFormKeys.Phone]: '',
        [RegisterFormKeys.City]: '',
        [RegisterFormKeys.BirthDate]: '',
        [RegisterFormKeys.Gender]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    });

    const [emailInputError, setEmailInputError] = useState('');
    const [passwordInputError, setPasswordInputError] = useState('');
    const [confirmInputError, setConfirmInputError] = useState('');
    const [touched, setTouched] = useState({});
    const [inputError, setInputError] = useState(false);
    const [validation, setValidation] = useState({});
    const [revealPassword, setRevealPassword] = useState(false);
    const regFormRef = useRef(null);

    function formReset() {
        regFormRef.current.reset();
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

    const conditions = {
        minLength: values.Password.length >= 6,
        capitalLetter: /[A-Z]/.test(values.Password),
        smallLetter: /[a-z]/.test(values.Password),
        number: /\d/.test(values.Password),
        specialChar: /[@$!%*?&_\-]/.test(values.Password)
    };

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

        setRevealPassword(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            closeForm();
        }
    }, [isAuthenticated]);

    // focus on email field when is shown
    const nameRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleShown = () => {
            if (nameRef.current) {
                nameRef.current.focus();
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

    const handleBlur = (e) => {
        const name = e.target.name;
        setTouched(state => ({ ...state, [name]: true }));
        // setValidation(state => ({ ...state, [name]: '' }));
        // console.log('handed', name);
    };


    // input validators
    useEffect(() => {
        // const timeoutId = setTimeout(() => {
        // }, 300);
        // return () => clearTimeout(timeoutId);

        for (let item of Object.keys(touched)) {
            if (item) {
                if (!values[item]) {
                    const error = `*${item} is required!`
                    setValidation(state => ({ ...state, [item]: { error, validated: false } }));
                } else {
                    // setValidation(state => ({ ...state, [item]: '' }));

                    console.log('key ->>', item);
                    console.log('values ->>', values);
                    if (values == undefined) {
                        showErrorToast('Validation error', { toastId: 'validationError' });
                        return;
                    }
                    const checkValidation = validatorHandler(item, values[item]);
                    console.log(checkValidation);
                    setValidation(state => ({ ...state, [item]: checkValidation }));
                }
            }
        }
    }, [touched]);

    useEffect(() => {
        console.log(values);
    }, [values])


    const confirmPasswordInputValidator = () => {
        if (values['confirm-password'] === '') {
            setConfirmInputError('*confirm password is required!')
        } else if ((values.password || !values.password) && values.password !== values['confirm-password']) {
            setConfirmInputError('*passwords did not match!')

        }
    }

    function revealPasswordHandler(e) {
        e.preventDefault();
        setRevealPassword(!revealPassword);
    }

    const clearErrors = (e) => {
        const name = e.target.name;
        setTouched(state => ({ ...state, [name]: false }));
        // setValidation(state => ({ ...state, [name]: '' }));

        // console.log(e.target.name);
        // if (e.target.name === 'email') {
        //     setEmailInputError('');
        //     setTouched(false);
        // } else if (e.target.name === 'password') {
        //     setPasswordInputError('');
        // } else if (e.target.name === 'confirm-password') {
        //     setConfirmInputError('');
        // }
        // else if (e.target.name === 'closeBtn') {
        //     setEmailInputError('');
        //     setPasswordInputError('');
        //     setConfirmInputError('');
        //     setTouched(false);
        // }
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
                        <form ref={regFormRef} className={`col ${styles.registerForm}`} onSubmit={onSubmit} autoComplete="off">
                            <div className={styles.registerWrapper}>
                                <div className={styles.registerLeftSide}>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerName" className="">
                                            *Name
                                        </label>
                                        <input
                                            className={`border ${touched.Name && validation['Name'] && !validation['Name'].validated ? 'is-invalid' : ''}
                                             ${touched.Name && validation['Name'] && validation['Name'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerName"
                                            type="text"
                                            placeholder='Name'
                                            name={RegisterFormKeys.Name}
                                            value={values[RegisterFormKeys.Name]}
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            minLength="2"
                                            maxLength="50"
                                            autoComplete="off"
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            ref={nameRef}
                                            required
                                            
                                        />
                                        {touched.Name && validation['Name'] && !validation['Name'].validated && (
                                            <p className={styles.errorMsg}>{validation['Name'].error}</p>
                                        )}

                                    </div>
                                    <div className=' d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerLastName" className="">
                                            *Last name
                                        </label>
                                        <input
                                            className={`${touched.LastName && validation['LastName'] && !validation['LastName'].validated ? 'is-invalid' : ''}
                                             ${touched.LastName && validation['LastName'] && validation['LastName'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerLastName"
                                            type="text"
                                            placeholder='Last name'
                                            name={RegisterFormKeys.LastName}
                                            value={values[RegisterFormKeys.LastName]}
                                            autoComplete="off"
                                            minLength="2"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                        />
                                        {touched.LastName && validation['LastName'] && !validation['LastName'].validated && (
                                            <p className={styles.errorMsg}>{validation['LastName'].error}</p>
                                        )}


                                    </div>

                                    <div className=' d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerEmail3" className="">
                                            *Email
                                        </label>
                                        <input type="email"
                                            className={`${touched.Email && validation['Email'] && !validation['Email'].validated ? 'is-invalid' : ''}
                                             ${touched.Email && validation['Email'] && validation['Email'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerEmail3"
                                            name={RegisterFormKeys.Email}
                                            value={values[RegisterFormKeys.Email]}
                                            placeholder='Email'
                                            autoComplete="off"
                                            minLength="7"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                            pattern='[a-z0-9._%+!$&*=^|~#%`?{}\/\-]+@([a-z0-9\-]+\.)+(com|bg)'
                                            title="Please, enter valid email. Email must finish with .com or .bg"
                                            
                                        />
                                        {touched.Email &&  validation['Email'] && !validation['Email'].validated && (
                                            <p className={styles.errorMsg}>{validation['Email'].error}</p>
                                        )}

                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <button className={styles.revealPassword} onClick={revealPasswordHandler}><i class={`fas ${!revealPassword ? 'fa-eye': 'fa-eye-slash'}`}></i></button>
                                        <label htmlFor="registerPassword3" className="">
                                            *Password
                                        </label>
                                        <input type={!revealPassword ? 'password': 'text'}
                                            className={`${touched.Password && validation['Password'] && !validation['Password'].validated ? 'is-invalid' : ''}
                                             ${touched.Password && validation['Password'] && validation['Password'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            name={RegisterFormKeys.Password}
                                            value={values[RegisterFormKeys.Password]}
                                            id="registerPassword3"
                                            placeholder='Password'
                                            autoComplete="off"
                                            minLength="6"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}'
                                             />

                                        {touched.Password && validation['Password'] &&  !validation['Password'].validated && (
                                            <p className={styles.errorMsg}>{validation['Password'].error}</p>
                                        )}

                                        {touched.Password && validation['Password'] && !validation['Password'].validated && (
                                            <ul className={styles.passwordTips}>
                                                <li>Password must contain:</li>
                                                <li style={{color: !conditions.minLength ? 'red': 'gray'}}><i className={`fas ${!conditions.minLength ? 'fa-times' : 'fa-check'}`}></i> min 6 characters</li>
                                                <li style={{ color: !conditions.capitalLetter ? 'red' : 'gray' }}><i className={`fas ${!conditions.capitalLetter ? 'fa-times' : 'fa-check'}`}></i> min 1 capital letter</li>
                                                <li style={{ color: !conditions.smallLetter ? 'red' : 'gray' }}><i className={`fas ${!conditions.smallLetter ? 'fa-times' : 'fa-check'}`}></i> min 1 small letter</li>
                                                <li style={{ color: !conditions.number ? 'red' : 'gray' }}><i className={`fas ${!conditions.number ? 'fa-times' : 'fa-check'}`}></i> min 1 digit</li>
                                                <li style={{ color: !conditions.specialChar ? 'red' : 'gray' }}><i className={`fas ${!conditions.specialChar ? 'fa-times' : 'fa-check'}`}></i> min 1 special symbol(@$!%*?&_\-)</li>
                                            </ul>
                                        )}

                                    </div>
                                </div>

                                <div className={styles.registerRightSide}>

                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerPnone" className="">
                                            *Phone number
                                        </label>
                                        <input
                                            className='shadow-sm form-control form-control-sm w-100'
                                            id="registerPhone"
                                            type="number"
                                            placeholder='Phone number'
                                            name={RegisterFormKeys.Phone}
                                            value={values[RegisterFormKeys.Phone]}
                                            autoComplete="off"
                                            minLength="8"
                                            maxLength="15"
                                            pattern="^\d{8,15}$"
                                            required
                                            title="You must enter a valid phone number between 8 and 15 digits"
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                        />
                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerCity" className="">
                                            *City
                                        </label>
                                        <input
                                            className='shadow-sm form-control form-control-sm w-100'
                                            id="registerCity"
                                            type="text"
                                            placeholder='City'
                                        />
                                    </div>

                                    <div className="d-flex w-75 position-relative">
                                        <div className='d-flex flex-column'>
                                            <label htmlFor="registerBirthDate" className="">
                                                *Birth date
                                            </label>

                                            <input
                                                className='shadow-sm form-control form-control-sm'
                                                id="registerBirthDate"
                                                type="text"
                                                placeholder='dd/mm/yy'
                                            />
                                        </div>

                                        <div className='d-flex flex-column position-relative'>
                                            <label htmlFor="registerName" className="">
                                                *Gender
                                            </label>
                                            <select className='shadow-sm form-control form-control-sm ' name="" id="registerGender">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="ConfirmPassword3" className="">
                                            *Repeat-Password
                                        </label>
                                        <input type="password"
                                            className={`shadow-sm form-control form-control-sm w-100 {${confirmInputError ? 'is-invalid' : ''}}`}
                                            name={RegisterFormKeys.ConfirmPassword}
                                            id="ConfirmPassword3"
                                            onChange={onChange}
                                            value={values[RegisterFormKeys.ConfirmPassword]}
                                            placeholder='Repeat-password'
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
                                Already have an account?<span><a name="loginLink" style={{ color: 'blue', fontSize: '1.1em', marginBottom: '7px' }} className="btn" data-bs-toggle="modal" data-bs-target="#Login" onClick={closeForm}>Login</a></span></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}