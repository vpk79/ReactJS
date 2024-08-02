import { IMGBBKEY } from "../../const/const";
import React, { useState } from 'react';



const UploadForm = ({ uploadImage }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const url = await uploadImage(file);
            setImageUrl(url);
        } catch (err) {
            console.error(err);
        }
    };


async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBKEY}`, { // Замести YOUR_API_KEY с твоя API ключ
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
        return data.data.url; // Връща линка към каченото изображение
    } else {
        throw new Error('Image upload failed');
    }
}



    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Качи снимка</button>
            {imageUrl && (
                <div>
                    <p>Качената снимка:</p>
                    <img src={imageUrl} alt="Uploaded" />
                </div>
            )}
        </div>
    );
};

export default UploadForm;