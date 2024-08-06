import { showErrorToast } from "../Toasts/toastsMsg";

export function generateUID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';

    const length = 16;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters.charAt(randomIndex);
    }

    return uid;
}

export function getCurrentDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${formattedMinutes}`;

    return { formattedDate, formattedTime };
}


export const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
};

// delays for smooth permormance
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const getMonth = (value) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[value];
}
export const getDayOfWeek = (value) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[value];
}

export const calculateTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return [days, hours, minutes, seconds]
}


export const appointmentValidator = (values) => {
    const currentDate = new Date();
    const selectedDate = new Date(values.Date)
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const day = selectedDate.getDay();

    if (selectedDate < currentDate) {
        showErrorToast('You cannot make appointment with past date!', { toastId: 'errorAppointmentDate' });
        return false;
    } else

        if (day == 0 || day == 2 || day == 4 || day == 6 || day == 7) {
            showErrorToast('Incorrect day - (Mo, We, Fr) only!', { toastId: 'errorAppointmentDay' });
            return false;
        } else

            if (hour < 8 || hour > 13 || hour === 8 && minutes < 30 || hour === 13 && minutes > 10) {
                showErrorToast('Incorrect hour (8.30 - 13.30) only!', { toastId: 'errorAppointmentDate' });
                return false;
            } else

                return true;
}