import { Link } from 'react-router-dom'; // Navigation package

function More() {
    return (
        <main>
            <h1>More</h1>
            <Link to="/koalaSighting">
                Koala Sightings
            </Link>
        </main>
    )
}

export default More;