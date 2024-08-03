import { showSuccessToast } from "../Toasts/toastsMsg";
import { IMGBBKEY } from "../const/const";
 
 export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBKEY}`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
        if (data.success) {
            showSuccessToast('Image changed successfully!', {toastId: 'successUpload'})
        return data.data.url;
    } else {
        throw new Error('Image upload failed');
    }
}