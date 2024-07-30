import React from 'react';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
    return (
        <div className="auth-modal">
            <div className="auth-modal-content">
                {/* <button className="auth-modal-close" onClick={onClose}>&times;</button> */}
                <h2>Welcome, Guest!</h2>
                <p>Please, login or register to use our services.</p>
                <button className="auth-modal-button" data-bs-toggle="modal"
                    data-bs-target="#Login">Login</button>
                <button className="auth-modal-button" data-bs-toggle="modal"
                    data-bs-target="#Register">Register</button>
            </div>
        </div>
    );
};

export default AuthModal;