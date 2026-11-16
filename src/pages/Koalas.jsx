
import { useState, useEffect, useRef } from 'react';
import { getKoalas } from '../services/wordpressApi';
import KoalaCard from '../components/KoalaCard';
import './Koalas.css';
import { useLocation } from 'react-router-dom';

function Koalas() {

    const [koalas, setKoalas] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0); // Stores the position of the current koala being displayed
    const touchStart = useRef(null);
    const location = useLocation();
    // retrieve the IDs of saved koalas in localStorage
    const [savedKoalas, setSavedKoalas] = useState(() => {
        try {
            const storedKoalas = localStorage.getItem('savedKoalas');
            return storedKoalas ? JSON.parse(storedKoalas) : []; // return parsed list of koala ids if there are stored koalas, otherwise return empty array
        } catch (error) {
            console.error('Unable to load saved koalas: ', error);
            return []; // Start with empty array if something goes wrong
        }
    });

    useEffect(() => {
        async function loadKoalas() {
            try {
                const data = await getKoalas();

                setKoalas(data);

                const returnToKoala = location.state?.returnToKoala;

                if (returnToKoala != null) {
                    const index = data.findIndex(
                        (koala) => koala.id === Number(returnToKoala)
                    );

                    if (index !== -1) {
                        setCurrentIndex(index);
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        }

        loadKoalas();
    }, [location.state?.returnToKoala]);

    // Save koalas to local storage
    useEffect(() => {
        try {
            localStorage.setItem('savedKoalas', JSON.stringify(savedKoalas));
        } catch (err) {
            console.error('Unable to save koalas: ', err);
        }
    }, [savedKoalas]);

    // Next koala button
    function nextKoala() {
        setCurrentIndex((previousIndex) => (previousIndex + 1) % koalas.length); // Modulus operator used for navigation wrap around
    }

    // previous koala button
    function previousKoala() {
        setCurrentIndex((previousIndex) => (previousIndex - 1 + koalas.length) % koalas.length);
    }

    // Create array of only favourite koalas with all their info
    const favouriteKoalas = koalas.filter((koala) =>
        savedKoalas.includes(koala.id)
    );

    //open saved koala from saved koala list
    function viewKoala(koalaId) {
        const index = koalas.findIndex((koala) => koala.id === koalaId);
        if (index !== -1) {
            setCurrentIndex(index);
            setActiveTab('all');
        }
    }

    function toggleSaved(koalaID) { // toggle function to save/unsave koalas
        setSavedKoalas((previousSaved) => {
            if (previousSaved.includes(koalaID)) {  // Checks whether the koala ID is already saved
                return previousSaved.filter((id) => id !== koalaID); //if so, it creates a new array which excludes the current koala id
            }
            return [...previousSaved, koalaID]; //otherwise, create a new array which contains existing saved koala IDs plus the new one
        });
    }

    //add swipe gestures

    function handleTouchStart(event) {
        // Ignore touches that start on a button or link
        if (event.target.closest('button, a')) {
            touchStart.current = null;
            return;
        }
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(event) {
        if (!touchStart.current) {
            return;
        }
        const touch = event.changedTouches[0];
        const differenceX = touch.clientX - touchStart.current.x; //negative indicated a left swipe, positive is right swipe
        const differenceY = touch.clientY - touchStart.current.y;
        touchStart.current = null;
        // Only recognise a deliberate horizontal swipe
        if (Math.abs(differenceX) < 60 || Math.abs(differenceX) <= Math.abs(differenceY)) { // At least 60 pixels of horizontal swipe is required, and also checks if swipe moved vertically more than horizontally
            return;
        }

        if (differenceX < 0) {
            nextKoala();
        } else {
            previousKoala();
        }
    }

    return (
        <main className="koalas-page">

            <h1>Discover Our Koalas</h1>
            <div className="koala-tabs" role="group">
                <button
                    type="button"
                    className={`koala-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Koalas
                </button>
                <button
                    type="button"
                    className={`koala-tab ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved Koalas ({savedKoalas.length})
                </button>
            </div>

            {error ? (
                <p>Unable to load koalas: {error}</p>
            ) : koalas.length === 0 ? (
                <p>Loading koalas...</p>
            ) : activeTab === 'all' ? (
                // All koalas view
                <div className="koala-discovery" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => touchStart.current = null}>
                    <KoalaCard
                        key={koalas[currentIndex].id}
                        id={koalas[currentIndex].id}
                        name={koalas[currentIndex].name}
                        image={koalas[currentIndex].image}
                        status={koalas[currentIndex].status}
                        gender={koalas[currentIndex].gender}
                        excerpt={koalas[currentIndex].excerpt}
                        isSaved={savedKoalas.includes(koalas[currentIndex].id)}
                        onToggleSaved={() => toggleSaved(koalas[currentIndex].id)}
                    />
                    <div className="koala-navigation">
                        <button onClick={previousKoala}>← Previous</button>

                        <span>{currentIndex + 1} of {koalas.length}</span>

                        <button onClick={nextKoala}>Next →</button>

                    </div>

                </div>
            ) : (
                <div className="saved-koalas-list">

                    {favouriteKoalas.length === 0 ? (
                        <div className="saved-koalas-empty">
                            <p className="saved-koalas-text">You haven't saved any koalas yet.</p>
                            <button
                                type="button"
                                onClick={() => setActiveTab('all')}
                            >
                                Discover Koalas
                            </button>
                        </div>
                    ) : (
                        favouriteKoalas.map((koala) => (
                            <div className="saved-koala-item" key={koala.id}>
                                <button type="button" className="saved-koala-view" onClick={() => viewKoala(koala.id)}>
                                    <img src={koala.image} className="saved-koala-image" />
                                    <div className="saved-koala-info">
                                        <h2>{koala.name}</h2>
                                        <p>{koala.status}</p>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className="saved-koala-remove"
                                    onClick={() => toggleSaved(koala.id)}
                                    aria-label={`Remove ${koala.name} from saved koalas`}
                                >♥</button>
                            </div>
                        ))
                    )}

                </div>
            )}

        </main>
    );
}

export default Koalas;
