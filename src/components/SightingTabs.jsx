
import { NavLink } from 'react-router-dom';
import './SightingTabs.css';

function SightingTabs() {
    return (
        <nav className="sighting-tabs" aria-label="Koala sighting navigation">
            <NavLink
                to="/koalaSighting"
                end
                className={({ isActive }) =>
                    `sighting-tab ${isActive ? 'active' : ''}`
                }
            >
                New Sighting
            </NavLink>

            <NavLink
                to="/koalaSighting/mine"
                className={({ isActive }) =>
                    `sighting-tab ${isActive ? 'active' : ''}`
                }
            >
                My Sightings
            </NavLink>
        </nav>
    );
}

export default SightingTabs;
