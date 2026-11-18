import { useState, useEffect, useRef } from 'react';
import { MapPin, Info, Camera, LocateFixed } from 'lucide-react';
import './NewSighting.css';
import { saveSighting } from '../services/koalaSightingsDB';
import SightingTabs from '../components/SightingTabs';



function NewSighting({ onSaved }) {
    //usestate declarations
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sightingDate, setSightingDate] = useState('');
    const [sightingTime, setSightingTime] = useState('');
    const [condition, setCondition] = useState('');
    const [notes, setNotes] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const photoInputRef = useRef(null);
    const [manualLocation, setManualLocation] = useState('');

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your phone or browser');
            return;
        }
        setLoading(true);
        setError('');
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log('GPS coordinates:', position.coords);
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            setLoading(false);
        },
            (err) => {
                setError('Unable to retrieve location.');
                setLoading(false);
                console.error('Geolocation error:', err);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    // Use effect to display preview of selected photo
    useEffect(() => {
        if (!photo) {
            setPhotoPreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(photo);
        setPhotoPreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [photo]);

    // save sighting to indexdb
    const handleSaveSighting = async () => {
        //Check all required fields are entered
        if ((!location && !manualLocation.trim()) || !sightingDate || !sightingTime || !condition) {
            setSaveMessage('Please complete all required fields');
            return;
        }
        // create sighting record object
        const sighting = {
            location: location, manualLocation: manualLocation.trim(), date: sightingDate, time: sightingTime, condition: condition, notes: notes, photo: photo, createdAt: new Date().toISOString()
        }
        try {
            setSaving(true);
            setSaveMessage('');
            //Save to IndexedDB
            const id = await saveSighting(sighting);
            await onSaved?.();
            setSaveMessage('Koala sighting saved!');

            // Reset all form fields after successful save
            setLocation(null);
            setSightingDate('');
            setSightingTime('');
            setCondition('');
            setNotes('');
            setPhoto(null);
            photoInputRef.current.value = ''
            setManualLocation('');
        } catch (error) {
            console.log('Error when saving sighting', error);
            setSaveMessage('Unable to save sighting. Please try again');
        } finally {
            setSaving(false);
        }
    }

    return (
        <main>
            <section className="koala-sighting-content">
                <h2 className="form-heading">Add New Sighting</h2>
                <div className="sighting-field">
                    <label htmlFor="sighting-location-button">Location<span className="required">*</span></label>
                    <button id="sighting-location-button" type="button" className="sighting-location-btn" onClick={getCurrentLocation} disabled={loading}>
                        <LocateFixed size={18} />
                        {loading ? 'Getting current location...' : 'Use My Current Location'}
                    </button>
                    {error && <p className="locationError">Error: {error}</p>}
                    {location && (
                        <div className="sighting-coordinates">
                            <MapPin size={18} />
                            <span>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
                        </div>
                    )}
                    <div className="sighting-location-divider">
                        <span>OR</span>
                    </div>
                    <label htmlFor="manual-location">Enter location manually</label>
                    <input type="text" id="manual-location" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)}
                        placeholder="Suburb, address or landmark" />
                </div>
                <div className="sighting-field">
                    <label htmlFor='sighting-date'>Date of sighting<span className="required">*</span></label>
                    <input type="date" id="sighting-date" value={sightingDate} onChange={(d) => setSightingDate(d.target.value)} />
                </div>
                <div className="sighting-field">
                    <label htmlFor='sighting-time'>Time of sighting<span className="required">*</span></label>
                    <input type="time" id="sighting-time" value={sightingTime} onChange={(t) => setSightingTime(t.target.value)} />
                </div>
                <div className="sighting-field">
                    <label htmlFor='sighting-condition'>Koala condition<span className="required">*</span></label>
                    <select required id="koala-condition" value={condition} onChange={(c) => setCondition(c.target.value)}>
                        <option value="" disabled>Select condition</option>
                        <option value="healthy">Healthy</option>
                        <option value="injured">Injured</option>
                        <option value="sick">Sick</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div className="sighting-field">
                    <label>Photograph (optional)</label>
                    <input ref={photoInputRef} type="file" id="sighting-photo" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                    {/* Display file preview */}
                    {photoPreview && (
                        <div className="sighting-photo-preview">
                            <img src={photoPreview} />
                        </div>
                    )}
                </div>
                <div className="sighting-field">
                    <label htmlFor='sighting-notes'>Notes (optional)</label>
                    <textarea id="sighting-notes" type="text" value={notes} onChange={(n) => setNotes(n.target.value)} placeholder="Describe any observations..." rows={2} />
                </div>
                <div className="sighting-submit-button">
                    <button id="sighting-submit" type="button" onClick={handleSaveSighting} disabled={saving}>{saving ? 'Saving...' : 'Save Sighting'}</button>
                    {saveMessage && (<p className={`save-sighting-message ${saveMessage === 'Koala sighting saved!' ? 'save-success' : 'save-error'}`}>{saveMessage}</p>)}
                </div>


            </section>

            <section className="koala-sighting-disclaimer">
                <Info className="disclaimer-icon" size={14} />
                <h3>Personal observation log</h3>
                <p>Saving a sighting does not notify a wildlife rescue organisation. Injured or distressed koalas should be reported directly to an appropriate wildlife rescue service</p>
            </section>

        </main>
    )
}

export default NewSighting;