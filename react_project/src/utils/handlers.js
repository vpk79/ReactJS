import { showErrorToast, showSuccessToast } from "../Toasts/toastsMsg";
import { APPOINTMENTS } from "../const/const";
import * as request from "../lib/request";
import { loginValidator } from "../services/validators";


export const appointment = async (values, userId) => {

    try {
        let loadData = await request.get(`${APPOINTMENTS}?where=_ownerId%3D%22${userId}%22`);
        if (loadData.length > 0) {
            const data = loadData.filter(x => x.Doctor === values.Doctor && x.Date === values.Date.toISOString());
            if (data.length > 0) {
                showErrorToast('This date is already appointed.', { toastId: 'appointmentError' })
                return;
            }
        }
        const addData = await request.post(APPOINTMENTS, values);
        showSuccessToast('Appointment successfull.', {toastId: 'appointmentSuccess'});
    } catch (error) {
        showErrorToast(error.message, {toastId: 'appointmentError2'})
    }
  

    // console.log(values);
    // console.log(loadData);
}