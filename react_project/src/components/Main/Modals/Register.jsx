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
    BirthDate: 'BirthDate',
    Gender: 'Gender',
    Email: 'Email',
    Password: 'Password',
    RepeatPassword: 'RepeatPassword'
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
        [RegisterFormKeys.RepeatPassword]: ''
    });

    const [touched, setTouched] = useState({});
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
            [RegisterFormKeys.RepeatPassword]: ''
        });
    }

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
        if (validation.BirthDate && validation.BirthDate.validated) return;
        if (touched.BirthDate && values.BirthDate) {
            console.log(values.BirthDate);
            let value = values.BirthDate.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
            if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
            if (value.length > 10) value = value.slice(0, 10);
            values.BirthDate = value;
        }

    }, [values]);

    useEffect(() => {
        console.log('entered');
        const matched = {};
        if (touched.RepeatPassword && values.RepeatPassword) {
            if (values.Password && validation['Password'] && !validation['Password'].validated) {
                if (values.RepeatPassword === values.Password) {
                    matched.error = false;
                    matched.validated = true;
                    console.log('matched');
                } else {
                    matched.error = 'Re-password not match!';
                    matched.validated = false;
                }
            } else {
                console.log('Notmatched2');
                matched.error = 'Re-password not match!';
                matched.validated = false;
            }
            setValidation(state => ({ ...state, RepeatPassword: matched }));
        }

        console.log('validation', validation);
    }, [values]);

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

    
    // handle all inputs
    const handleBlur = (e) => {
        const name = e.target.name;
        setTouched(state => ({ ...state, [name]: true }));
        // setValidation(state => ({ ...state, [name]: '' }));
        // console.log('handed', name);
    };


    // input validators
    useEffect(() => {
        for (let item of Object.keys(touched)) {
            if (item) {
                if (!values[item]) {
                    const error = `*${item} is required!`
                    setValidation(state => ({ ...state, [item]: { error, validated: false } }));
                } else {
                    console.log('key ->>', item);
                    console.log('values ->>', values);
                    if (values == undefined) {
                        showErrorToast('Validation error', { toastId: 'validationError' });
                        return;
                    }
                    if(item === 'RepeatPassword') return;
                    const checkValidation = validatorHandler(item, values[item]);
                    // console.log(checkValidation);
                    setValidation(state => ({ ...state, [item]: checkValidation }));
                }
            }
        }
    }, [touched]);



    function revealPasswordHandler(e) {
        e.preventDefault();
        setRevealPassword(!revealPassword);
    }

    const clearErrors = (e) => {
        const name = e.target.name;
        setTouched(state => ({ ...state, [name]: false }));
        // setValidation(state => ({ ...state, [name]: '' }));
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
                                            className={`
                                            ${touched.Email && validation['Email'] && !validation['Email'].validated ? 'is-invalid' : ''}
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
                                            minLength="6"
                                            maxLength='50'
                                            onChange={onChange}
                                            onInput={handleBlur}
                                            onBlur={handleBlur}
                                            onFocus={clearErrors}
                                            required
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
                                        <div className='d-flex flex-column'>
                                            <label htmlFor="registerBirthDate" className="">
                                                *Birth date
                                            </label>

                                            <input
                                                className={
                                                    `${touched.BirthDate && validation['BirthDate'] && !validation['BirthDate'].validated ? 'is-invalid' : ''}
                                             ${touched.BirthDate && validation['BirthDate'] && validation['BirthDate'].validated ? 'is-valid' : ''}
                                              shadow-sm form-control form-control-sm`}
                                                id="registerBirthDate"
                                                type="text"
                                                placeholder='DD/MM/YYYY'
                                                minLength="10"
                                                maxLength="10"
                                                autoComplete="off"
                                                name={RegisterFormKeys.BirthDate}
                                                value={values[RegisterFormKeys.BirthDate]}
                                                required
                                                pattern="^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$"
                                                title="Birth date must be in format DD/MM/YYYY."
                                                onChange={onChange}
                                                onInput={handleBlur}
                                                onBlur={handleBlur}
                                                onFocus={clearErrors}
                                            />
                                            {touched.BirthDate && validation['BirthDate'] && !validation['BirthDate'].validated && (
                                                <p className={styles.errorMsg}>{validation['BirthDate'].error}</p>
                                            )}
                                        </div>

                                        <div className='d-flex flex-column position-relative'>
                                            <label htmlFor="registerName" className="">
                                                *Gender
                                            </label>
                                            <select className='shadow-sm form-control form-control-sm'
                                             name={RegisterFormKeys.RepeatPassword}
                                             id="registerGender"

                                             >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="female">Other</option>
                                            </select>
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