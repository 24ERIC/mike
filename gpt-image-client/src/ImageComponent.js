import React, { useState } from 'react';
import axios from 'axios';

const ImageComponent = () => {
    const [image, setImage] = useState(null);

    const fetchImage = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-image');
            setImage(response.data.image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div>
            <button onClick={fetchImage}>Get Image</button>
            {image && <img src={`data:image/jpeg;base64,${image}`} alt="GPT Generated" />}
        </div>
    );
};

export default ImageComponent;
