import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Register.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';
import { validatorHandler } from '../../../services/validators';
import { showErrorToast } from '../../../Toasts/toastsMsg';

const RegisterFormKeys = {
    Name: 'Name',
    LastName: 'LastName',
    Phone: 'Phone',
    City: 'City',
    Date: 'Date',
    Gender: 'Gender',
    Email: 'Email',
    Password: 'Password',
    RepeatPassword: 'RepeatPassword'
}


export default function Register() {
    const intialValues = {
        [RegisterFormKeys.Name]: '',
        [RegisterFormKeys.LastName]: '',
        [RegisterFormKeys.Phone]: '',
        [RegisterFormKeys.City]: '',
        [RegisterFormKeys.Date]: '',
        [RegisterFormKeys.Gender]: 'select...',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.RepeatPassword]: ''
    };

    const { isAuthenticated, registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit, setValues } = useForm(registerSubmitHandler, intialValues);

    const [touched, setTouched] = useState({});
    const [validation, setValidation] = useState({});
    const [revealPassword, setRevealPassword] = useState(false);
    const [isNotValidated, setIsNotValidated] = useState(true);
    const closeBtnRef = useRef(null);
    const nameRef = useRef(null);
    const modalRef = useRef(null);

    function formReset() {
        setValues(intialValues);
        setTouched({});
    }

    // check whether the form is validated completely
    useEffect(() => {
        let result = true;
        for (let key of Object.keys(RegisterFormKeys)) {
            if (validation[key] && validation[key].validated) {
                // console.log(key, 'passed');
                continue;
            } else {
                // console.log(key, 'not passed');
                result = false;
            }
        }
        if (result) {
            setIsNotValidated(false)
        } else {
            setIsNotValidated(true);
        }
    }, [validation])

    // dynamic set conditions for valid password
    const conditions = {
        minLength: values.Password.length >= 6,
        capitalLetter: /[A-Z]/.test(values.Password),
        smallLetter: /[a-z]/.test(values.Password),
        number: /\d/.test(values.Password),
        specialChar: /[@$!%*?&_\-]/.test(values.Password)
    };


    // set birthday separators
    useEffect(() => {
        if (validation.Date && validation.Date.validated) return;
        if (touched.Date && values.Date) {
            // console.log(values.Date);
            let value = values.Date.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
            if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
            if (value.length > 10) value = value.slice(0, 10);
            values.Date = value;
        }

    }, [values]);


    // repeat password handler
    useEffect(() => {
        const matched = {};
        if (touched.RepeatPassword && values.RepeatPassword) {
            if (!!values.Password && validation['Password'].validated) {
                if (values.RepeatPassword === values.Password) {
                    matched.error = false;
                    matched.validated = true;
                } else {
                    matched.error = 'Re-password not match!';
                    matched.validated = false;
                }
            } else {
                matched.error = 'Re-password not match!';
                matched.validated = false;
            }
            setValidation(state => ({ ...state, RepeatPassword: matched }));
        }
    }, [values]);


    // closing the form when is necessary
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

    // close form if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            closeForm();
        }
    }, [isAuthenticated]);


    // focus on name field when is shown
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


    // handle all inputs
    const handleBlur = (e) => {
        const name = e.target.name;
        setTouched(state => ({ ...state, [name]: true }));
    };

    // input validators
    useEffect(() => {
        for (let item of Object.keys(touched)) {
            if (item) {
                if (!values[item]) {
                    const error = `*${item} is required!`
                    setValidation(state => ({ ...state, [item]: { error, validated: false } }));
                } else {
                    if (values == undefined) {
                        showErrorToast('Validation error', { toastId: 'validationError' });
                        return;
                    }
                    if (item === 'RepeatPassword') continue;
                    // console.log('key1 ->>', item);
                    // console.log('values1 ->>', values);
                    // console.log('touched ->>', touched);
                    // console.log(values[item]);
                    const checkValidation = validatorHandler(item, values[item]);
                    setValidation(state => ({ ...state, [item]: checkValidation }));
                    // console.log(validation);
                }
            }
        }
    }, [touched]);

    // handle show password button
    function revealPasswordHandler(e) {
        e.preventDefault();
        setRevealPassword(!revealPassword);
    }

    const clearErrors = (e) => {
        // const name = e.target.name;
        // setTouched(state => ({ ...state, [name]: false }));
        // setValidation(state => ({ ...state, [name]: '' }));
    }

    // handle backdrop close
    useEffect(() => {
        const modalElement = modalRef.current;
        const handleModalHidden = () => {
            closeForm();
            console.log('form clear');
        };

        if (modalElement) {
            modalElement.addEventListener('hidden.bs.modal', handleModalHidden);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
            }
        };
    }, []);



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
                        <form className={`col ${styles.registerForm}`} onSubmit={onSubmit} autoComplete="off">
                            <div className={styles.registerWrapper}>
                                <div className={styles.registerLeftSide}>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerName" className="">
                                            *Name
                                        </label>
                                        <input
                                            className={`
                                            ${touched.Name && validation['Name'] && !validation['Name'].validated ? 'is-invalid' : ''}
                                             ${touched.Name && validation['Name'] && validation['Name'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerName"
                                            type="text"
                                            placeholder='Name'
                                            name={RegisterFormKeys.Name}
                                            value={values[RegisterFormKeys.Name]}
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            tabIndex="1"
                                            minLength="2"
                                            maxLength="50"
                                            autoComplete="off"
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            ref={nameRef}
                                            required
                                            title="Please, enter your name - 2-50 characters only."

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
                                            className={`
                                            ${touched.LastName && validation['LastName'] && !validation['LastName'].validated ? 'is-invalid' : ''}
                                             ${touched.LastName && validation['LastName'] && validation['LastName'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerLastName"
                                            type="text"
                                            placeholder='Last name'
                                            name={RegisterFormKeys.LastName}
                                            value={values[RegisterFormKeys.LastName]}
                                            autoComplete="off"
                                            tabIndex="2"
                                            minLength="2"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                            title="Please, enter your name - 2-50 characters only."
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
                                            className={`
                                            ${touched.Email && validation['Email'] && !validation['Email'].validated ? 'is-invalid' : ''}
                                             ${touched.Email && validation['Email'] && validation['Email'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerEmail3"
                                            name={RegisterFormKeys.Email}
                                            value={values[RegisterFormKeys.Email]}
                                            placeholder='Email'
                                            autoComplete="off"
                                            tabIndex="3"
                                            minLength="7"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                            title="Please, enter valid email. Email must finish with .com or .bg"

                                        />
                                        {touched.Email && validation['Email'] && !validation['Email'].validated && (
                                            <p className={styles.errorMsg}>{validation['Email'].error}</p>
                                        )}

                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <button className={styles.revealPassword} onClick={revealPasswordHandler}><i className={`fas ${!revealPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                                        <label htmlFor="registerPassword3" className="">
                                            *Password
                                        </label>
                                        <input type={!revealPassword ? 'password' : 'text'}
                                            className={`
                                            ${touched.Password && validation['Password'] && !validation['Password'].validated ? 'is-invalid' : ''}
                                             ${touched.Password && validation['Password'] && validation['Password'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            name={RegisterFormKeys.Password}
                                            value={values[RegisterFormKeys.Password]}
                                            id="registerPassword3"
                                            placeholder='Password'
                                            autoComplete="off"
                                            tabIndex="4"
                                            minLength="6"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
                                            title="Please, enter a valid password."
                                        />

                                        {touched.Password && validation['Password'] && !validation['Password'].validated && (
                                            <p className={styles.errorMsg}>{validation['Password'].error}</p>
                                        )}

                                        {touched.Password && validation['Password'] && !validation['Password'].validated && (
                                            <ul className={styles.passwordTips}>
                                                <li>Password must contain:</li>
                                                <li style={{ color: !conditions.minLength ? 'red' : 'gray' }}><i className={`fas ${!conditions.minLength ? 'fa-times' : 'fa-check'}`}></i> min 6 characters</li>
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
                                            className={
                                                `${touched.Phone && validation['Phone'] && !validation['Phone'].validated ? 'is-invalid' : ''}
                                             ${touched.Phone && validation['Phone'] && validation['Phone'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerPhone"
                                            type="tel"
                                            placeholder='Phone number'
                                            name={RegisterFormKeys.Phone}
                                            value={values[RegisterFormKeys.Phone]}
                                            autoComplete="off"
                                            tabIndex="9"
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
                                        {touched.Phone && validation['Phone'] && !validation['Phone'].validated && (
                                            <p className={styles.errorMsg}>{validation['Phone'].error}</p>
                                        )}
                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="registerCity" className="">
                                            *City
                                        </label>
                                        <input
                                            className={
                                                `${touched.City && validation['City'] && !validation['City'].validated ? 'is-invalid' : ''}
                                             ${touched.City && validation['City'] && validation['City'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            id="registerCity"
                                            type="text"
                                            placeholder='City'
                                            minLength="2"
                                            maxLength="50"
                                            name={RegisterFormKeys.City}
                                            value={values[RegisterFormKeys.City]}
                                            autoComplete="off"
                                            pattern="^[A-Za-zА-Яа-я\s]{2,50}$"
                                            title="City must have between 2-50 charachters only."
                                            tabIndex="8"
                                            required
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                        />
                                        {touched.City && validation['City'] && !validation['City'].validated && (
                                            <p className={styles.errorMsg}>{validation['City'].error}</p>
                                        )}
                                    </div>

                                    <div className="d-flex w-75 position-relative">
                                        <div className='d-flex flex-column position-relative'>
                                            <label htmlFor="registerDate" className="">
                                                *Birth date
                                            </label>

                                            <input
                                                className={
                                                    `${touched.Date && validation['Date'] && !validation['Date'].validated ? 'is-invalid' : ''}
                                             ${touched.Date && validation['Date'] && validation['Date'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                                id="registerDate"
                                                type="text"
                                                placeholder='DD/MM/YYYY'
                                                minLength="10"
                                                maxLength="10"
                                                autoComplete="off"
                                                tabIndex="7"
                                                name={RegisterFormKeys.Date}
                                                value={values[RegisterFormKeys.Date]}
                                                required
                                                title="Date must be in format DD/MM/YYYY."
                                                onChange={onChange}
                                                onInput={handleBlur}
                                                onBlur={handleBlur}
                                                onFocus={clearErrors}
                                            />
                                            {touched.Date && validation['Date'] && !validation['Date'].validated && (
                                                <p className={styles.errorMsg}>{validation['Date'].error}</p>
                                            )}
                                        </div>

                                        <div className='d-flex flex-column position-relative w-75'>
                                            <label htmlFor="registerName" className="">
                                                *Gender
                                            </label>
                                            <select
                                                className={
                                                    `${touched.Gender && validation['Gender'] && !validation['Gender'].validated ? 'is-invalid' : ''}
                                             ${touched.Gender && validation['Gender'] && validation['Gender'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                                name={RegisterFormKeys.Gender}
                                                value={values[RegisterFormKeys.Gender]}
                                                id="registerGender"
                                                tabIndex="6"
                                                onClick={handleBlur}
                                                onChange={onChange}
                                                onInput={onChange}
                                                onBlur={handleBlur}
                                                onFocus={clearErrors}
                                                required
                                                title="Please, select your gender"
                                            >

                                                <option value={intialValues.Gender}>{intialValues.Gender}</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {touched.Gender && validation['Gender'] && !validation['Gender'].validated && (
                                                <p className={styles.errorMsg}>{validation['Gender'].error}</p>
                                            )}
                                        </div>

                                    </div>
                                    <div className='d-flex flex-column position-relative w-75'>
                                        <label htmlFor="RepeatPassword3" className="">
                                            *Repeat-Password
                                        </label>
                                        <input type="password"
                                            className={
                                                `${touched.RepeatPassword && validation['RepeatPassword'] && !validation['RepeatPassword'].validated ? 'is-invalid' : ''}
                                             ${touched.RepeatPassword && validation['RepeatPassword'] && validation['RepeatPassword'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm w-100`}
                                            name={RegisterFormKeys.RepeatPassword}
                                            id="RepeatPassword3"
                                            value={values[RegisterFormKeys.RepeatPassword]}
                                            placeholder='Repeat-password'
                                            autoComplete="off"
                                            tabIndex="5"
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            title="Re-Password should match with Password"
                                            required />
                                        {touched.RepeatPassword && validation['RepeatPassword'] && !validation['RepeatPassword'].validated && (
                                            <p className={styles.errorMsg}>{validation['RepeatPassword'].error}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnRegister} btn btn-primary`} disabled={isNotValidated}>
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