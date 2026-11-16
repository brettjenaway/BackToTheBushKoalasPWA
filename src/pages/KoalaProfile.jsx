
import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getKoala } from '../services/wordpressApi';
import './KoalaProfile.css';

function KoalaProfile() {

    const { id } = useParams();
    const location = useLocation();
    const [koala, setKoala] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadKoala() {
            setLoading(true);
            setError(null);

            try {
                const data = await getKoala(id);

                if (!cancelled) {
                    setKoala(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadKoala();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return <main><p>Loading koala...</p></main>;
    }

    if (error) {
        return <main><p>Unable to load koala: {error}</p></main>;
    }

    if (!koala) {
        return <main><p>Koala not found.</p></main>;
    }


    return (
        <main className="koala-profile-page">

            <Link to="/koalas" state={{ returnToKoala: location.state?.returnToKoala ?? Number(id) }} className="koala-profile-back">
                ← Back to Koalas
            </Link>

            <header className="koala-profile-header">
                <h1>{koala.name}'s Story</h1>

                <div className="koala-profile-badges">
                    <span className="koala-profile-status">
                        {koala.status}
                    </span>

                    <span className={`koala-profile-gender koala-profile-gender-${koala.gender?.toLowerCase()}`}>
                        {koala.gender}
                    </span>
                </div>
            </header>

            {koala.imageLarge && (
                <img
                    src={koala.imageLarge}
                    alt={koala.imageAlt || koala.name}
                    className="koala-profile-image"
                />
            )}
            <section className="koala-profile-details">
                <div className="koala-detail-item">
                    <span className="koala-detail-label">Age</span>
                    <span className="koala-detail-value">{koala.age || 'Unknown'}</span>
                </div>
                <div className="koala-detail-item">
                    <span className="koala-detail-label">Date Rescued</span>
                    <span className="koala-detail-value">{koala.rescueDate || 'Unknown'}</span>
                </div>
                <div className="koala-detail-item">
                    <span className="koala-detail-label">Primary Condition</span>
                    <span className="koala-detail-value">{koala.condition || 'Not specified'}</span>
                </div>
            </section>
            {koala.story && (
                <section className="koala-profile-story">
                    <h2>Meet {koala.name}</h2>
                    <p>{koala.story}</p>
                </section>
            )}

            <section className="koala-profile-journey">
                <h2>{koala.name}'s Recovery Journey</h2>
                <div className="koala-journey-timeline">
                    {[
                        { title: 'Rescued', text: koala.journeyRescued },
                        { title: 'Treatment', text: koala.journeyTreated },
                        { title: 'Rehabilitation', text: koala.journeyRehabilitation },
                        { title: 'Released', text: koala.journeyReleased }
                    ]
                        .filter((stage) => stage.text)
                        .map((stage) => (
                            <div className="koala-journey-item" key={stage.title}>
                                <span className="koala-journey-dot" />
                                <div className="koala-journey-content">
                                    <h3>{stage.title}</h3>
                                    <p>{stage.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </main>
    );

}

export default KoalaProfile;
