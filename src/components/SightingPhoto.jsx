import { useState, useEffect } from 'react';

function SightingPhoto({ photo }) {
    const [photoURL, setPhotoURL] = useState(null);

    useEffect(() => {
        if (!photo) {
            return;
        }
        const url = URL.createObjectURL(photo)
        setPhotoURL(url);
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [photo]);

    if (!photo || !photoURL) {
        return null;
    }
    return (
        <div className="sighting-card-photo">
            <img src={photoURL} />
        </div>
    );
}

export default SightingPhoto;