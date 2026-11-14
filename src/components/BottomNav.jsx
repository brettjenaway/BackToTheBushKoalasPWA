import { NavLink } from 'react-router-dom';
import { House, PawPrint, Heart, Newspaper, Menu } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" end className="nav-item">
                <span className="nav-content">
                    <House size={24} />
                    <span>Home</span>
                </span>
            </NavLink>

            <NavLink to="/koalas" end className="nav-item">
                <span className="nav-content">
                    <PawPrint size={24} />
                    <span>Koalas</span>
                </span>
            </NavLink>

            <NavLink to="/donate" end className="nav-item donate-item">
                <span className="nav-content">
                    <span className="donate-icon">
                        <Heart size={24} fill="currentColor" />
                    </span>
                    <span>Donate</span>
                </span>
            </NavLink>

            <NavLink to="/news" className="nav-item">
                <span className="nav-content">
                    <Newspaper size={24} />
                    <span>News</span>
                </span>
            </NavLink>

            <NavLink to="/more" className="nav-item">
                <span className="nav-content">
                    <Menu size={24} />
                    <span>More</span>
                </span>
            </NavLink>
        </nav>
    );
}

export default BottomNav;