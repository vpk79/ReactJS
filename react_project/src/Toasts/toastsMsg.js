import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toasts.css'

export const showInfoToast = (message, {toastId}) => {
    toast.info(message, {
        position: "top-center",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        toastId: toastId
    });
    
};

export const showSuccessToast = (message, { toastId }) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        toastId: toastId
    });
};

export const showErrorToast = (message, { toastId }) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        toastId: toastId
    });
};
