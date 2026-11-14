import { NavLink } from 'react-router-dom';

function BottomNav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/koalas">Koalas</NavLink>
            <NavLink to="/donate">Donate</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/more">More</NavLink>
        </nav>
    );
}

export default BottomNav;