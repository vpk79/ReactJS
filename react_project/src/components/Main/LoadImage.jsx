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