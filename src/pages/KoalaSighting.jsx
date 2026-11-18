
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

import NewSighting from './NewSighting';
import MySightings from './MySightings';

import './KoalaSighting.css';
import { getAllSightings } from '../services/koalaSightingsDB';

function KoalaSighting() {
    const [activeTab, setActiveTab] = useState('new');
    const [sightingCount, setSightingCount] = useState(0);

    const refreshSightingCount = async () => {
        try {
            const savedSightings = await getAllSightings();
            setSightingCount(savedSightings.length);
        } catch (err) {
            console.error('Unable to count sightings:', err);
        }
    };

    useEffect(() => {
        const loadCount = async () => {
            const savedSightings = await getAllSightings();
            setSightingCount(savedSightings.length);
        };

        loadCount().catch(console.error);
    }, []);

    return (
        <main className="koala-sighting-page">
            <section className="koala-sighting-header page-header">
                <h1>Koala Sightings</h1>
                <MapPin className="header-icon" />
                <p>Record a koala you've spotted and keep a personal log of your observations.</p>
            </section>
            <div className="sighting-tabs">
                <button
                    type="button"
                    className={activeTab === 'new' ? 'active' : ''}
                    onClick={() => setActiveTab('new')}
                >New Sighting
                </button>
                <button
                    type="button"
                    className={activeTab === 'mine' ? 'active' : ''}
                    onClick={() => { refreshSightingCount(); setActiveTab('mine'); }}
                >My Sightings ({sightingCount})
                </button>
            </div>
            {
                activeTab === 'new' ? (
                    <NewSighting onSaved={refreshSightingCount} />
                ) : (
                    <MySightings onDeleted={refreshSightingCount} />
                )
            }
        </main >
    );
}

export default KoalaSighting;