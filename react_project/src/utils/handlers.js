import { showErrorToast, showSuccessToast } from "../Toasts/toastsMsg";
import { APPOINTMENTS, MAILS } from "../const/const";
import * as request from "../lib/request";

export const appointment = async (values, userId) => {

    try {
        let loadData = await request.get(`${APPOINTMENTS}?where=_ownerId%3D%22${userId}%22`);
        if (loadData.length > 0) {
            const checkDate = loadData.filter(x => x.Date === values.Date.toISOString());
            if (checkDate.length > 0) {
                showErrorToast('This date is already appointed.', { toastId: 'appointmentError' })
                return;
            }

            const checkDoctor = loadData.filter(x => x.Doctor === values.Doctor);
            if (checkDoctor.length > 0) {
                showErrorToast('You already have appointment with this doctor.', { toastId: 'appointmentError' })
                return;
            }
        }
        const addData = await request.post(APPOINTMENTS, values);
        showSuccessToast('Appointment successfull.', {toastId: 'appointmentSuccess'});
    } catch (error) {
        showErrorToast(error.message, {toastId: 'appointmentError2'})
    }
}

export const contactUs = async(values) => {

    const response = await request.post(MAILS, values);
    console.log(response);
}