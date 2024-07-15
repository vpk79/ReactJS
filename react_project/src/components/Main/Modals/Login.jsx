import React, { useContext, useEffect, useRef } from 'react';
import styles from './Login.module.css';
import useForm from '../../../hooks/useForm';
import AuthContext from '../../../contexts/authContext';


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

    // focus on email field
    const emailRef = useRef(null);

    useEffect(()=>{

        if(emailRef.current){
            emailRef.current.focus();
        }
    }, []);


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

                            <button
                                id='closeBtn2'
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={formReset}
                                ref={closeBtnRef}
                            />
                        </div>
                        <form className={styles.loginForm} onSubmit={onSubmit}>
                            <h3 style={{ textAlign: 'center', marginTop: '-50px' }} className="form-title" id="LoginLabel">
                                Login
                            </h3>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        name={LoginFormKeys.Email}
                                        onChange={onChange}
                                        value={values[LoginFormKeys.Email]}
                                        ref={emailRef}
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
                                        name={LoginFormKeys.Password}
                                        id="inputPassword3"
                                        onChange={onChange}
                                        value={values[LoginFormKeys.Password]}
                                        autoComplete="on" />

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