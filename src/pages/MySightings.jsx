import { useEffect, useState } from 'react';
import { getAllSightings, deleteSighting } from '../services/koalaSightingsDB';
import SightingPhoto from '../components/SightingPhoto';
import { MapPin, Clock, Trash } from 'lucide-react';
import './MySightings.css';

const formatDate = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};



function MySightings() {
    const [sightings, setSightings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const handleDeleteSighting = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this sighting? This cannot be undone.');
        if (!confirmed) return;
        try {
            setDeletingId(id);
            await deleteSighting(id);
            setSightings((previousSightings) =>
                previousSightings.filter((sighting) => sighting.id !== id)
            );
        } catch (err) {
            setError('Unable to delete the sighting. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };
    useEffect(() => {
        const loadSightings = async () => {
            try {
                const savedSightings = await getAllSightings();
                setSightings(savedSightings.reverse()); // display all sightings in reverse, newest first
            } catch {
                setError('Unable to load your saved koala sightings');
            } finally {
                setLoading(false);
            }
        };
        loadSightings();
    }, []);
    if (loading) {
        return <p>Loading koala sightings...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <>
            <section className="my-sightings">
                <h2>My Sightings</h2>
                {sightings.length === 0 ? (
                    <p>You haven't recorded any koala sightings yet.</p>
                ) : (
                    sightings.map((sighting) => (
                        <article key={sighting.id} className="sighting-card">
                            <div className="sighting-card-image-container">
                                {sighting.photo && (<SightingPhoto photo={sighting.photo} />)}
                                <button type="button" className="sighting-delete-button" onClick={() => handleDeleteSighting(sighting.id)} disabled={deletingId === sighting.id}>
                                    <Trash size={18} />
                                </button>
                            </div>
                            <div className="sighting-card-content">
                                <div className="sighting-card-heading">
                                    <h3>{formatDate(sighting.date)}</h3>
                                    <span className={`sighting-status ${sighting.condition}`}>{sighting.condition}</span>
                                </div>
                                <div className="sighting-card-detail">
                                    <MapPin size={17} />
                                    <span>{sighting.manualLocation || (sighting.location ? `${sighting.location.latitude.toFixed(4)}, ${sighting.location.longitude.toFixed(4)}` : 'Not recorded')}</span>
                                </div>
                                <div className="sighting-card-detail">
                                    <Clock size={17} />
                                    <span>{formatTime(sighting.time)}</span>
                                </div>
                                {sighting.notes && (
                                    <p className="sighting-card-notes">
                                        {sighting.notes}
                                    </p>
                                )}

                            </div>
                        </article>
                    ))
                )}

            </section>
        </>
    )
}

export default MySightings;