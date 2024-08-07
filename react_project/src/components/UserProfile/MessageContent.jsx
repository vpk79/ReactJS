import { showErrorToast } from "../../Toasts/toastsMsg";
import { MAILS } from "../../const/const";
import * as request  from "../../lib/request";


export default function MessageContent({data, closeMessage}){
    const id = data._id;
    const email = data.Email;
    const date = data._createdOn;
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();

    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

    const formattedDate = `${addLeadingZero(day)}.${addLeadingZero(month)}.${year}`;
        console.log(data);

        const deleteMessage = async (id) => {
            // console.log(id);
            try {
                const response = request.remove(`${MAILS}/${id}`);
                closeMessage();
            } catch (error) {
                showErrorToast(error.message, {toastId: 'errorMail'});
            }
        }

    return (
        
        <>
            <div className='col-12 d-flex justify-content-between align-items-center'>
                <span onClick={closeMessage} className='btn back-arrow'><i class="fs-1 fas fa-long-arrow-alt-left"></i></span>
                <span onClick={()=> deleteMessage(id)} className='d-inline-block pb-n10'><i className="btn btn-secondary btn-sm fas fa-trash-alt"></i></span>
            </div>
            <div className='row border col-12 mx-0 px-0 my-2 wow fadeInUp bg-light rounded-3 shadow" data-wow-delay="0.1s"'>
                <div className='border row message-header col-12 px-0 mx-0 align-middle'>
                    <p className='my-3 fw-bold'>From: {email}</p>
                    <p className='fw-bold'>Subject: {data.Subject}</p>
                </div>
                <div className='row col-12 message-body my-4'>
                    <p>{data.Message}</p>
                </div>
                <div className='row col-12  border message-footer px-0 mx-0'>
                    <p className='my-3 fw-bold'>{formattedDate} {hour}:{minutes}</p>
                </div>
            </div>
        </>
    )
}