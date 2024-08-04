import { useContext, useState } from 'react';
import './TestimonialCard.css'
import AuthContext from '../../../contexts/authContext';
import * as request  from '../../../lib/request';
import { FEEDBACK } from '../../../const/const';
import { showErrorToast, showSuccessToast } from '../../../Toasts/toastsMsg';
import { ConfirmToast } from 'react-confirm-toast';

export default function TestemonialCard({ data, feedback, updateFeedback }) {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);

    async function deleteHandler(id){
        console.log('delete');
        try {
            const response = await request.remove(`${FEEDBACK}/${id}`);
            const remainingFeedback = feedback.filter(x => x._id !== id);
            updateFeedback(remainingFeedback);
            showSuccessToast('Post deleted successfully.', {toastId: 'deletedFeedback'})
        } catch (error) {
            showErrorToast(error.message, {toastId: 'deleteFeedback'});
        }
    }

    return (
        <>
            <div className="testimonial-item text-center">
                <img
                    className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                    src={data.img}
                    alt="Patient 1"
                    style={{ width: 100, height: 100 }}
                />
                <div className="testimonial-text rounded text-center p-4">
                    <p>{data.comment}</p>
                    <h5 className="mb-1">{data.name}</h5>
                    <span className="fst-italic">{data.profession}</span>
                </div>
                {userId === data._ownerId && <div className="btnWrapper">
                    <button className="btn btn-primary btn-sm m-2"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Comment"><i className="fas fa-edit"></i></button>
                    <button className="btn btn-primary btn-sm"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Comment" onClick={()=>setShowConfirm(true, {passive: true})}><i className="fas fa-trash-alt"></i></button>
                </div>
                }
                {showConfirm && <ConfirmToast
                    asModal='true'
                    className='custom-confirm-toast-theme'
                    position='top-center'
                    buttonNoText='No'
                    buttonYesText='Yes'
                    customFunction={() => deleteHandler(data._id)}
                    setShowConfirmToast={setShowConfirm}
                    showConfirmToast={showConfirm}
                    // theme='light'
                    toastText='Are you sure?'
                />}
            </div>
        </>
    )
}