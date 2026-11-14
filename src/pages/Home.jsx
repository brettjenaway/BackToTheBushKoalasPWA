import { Link } from 'react-router-dom';
import koalaHero from '../assets/koala-hero.jpg';
import NewsCard from '../components/NewsCard';
import './Home.css';

function Home() {
    return (
        <main className="home-page">

            <section className="home-welcome">
                <p className="home-greeting">Welcome to</p>
                <h1>Back to the Bush Koalas</h1>
                <p className="home-description">
                    Discover koala stories and follow their
                    journey back to the bush.
                </p>
            </section>

            <section className="discovery-card">
                <img src={koalaHero} alt="A koala resting in a tree" className="discovery-image" />
                <div className="discovery-content">
                    <h2>Discover The Koalas</h2>
                    <p>Meet the koalas receiving care, follow their journeys towards recovery and save your favourites.</p>

                    <Link to="/koalas" className="discovery-button">
                        Explore Koalas
                    </Link>
                </div>
            </section>

            <section className="home-news">
                <h2>Latest News</h2>
                <NewsCard title="Latest update from the rescue centre"
                    date="14 Nov 2026"
                    category="News"
                    image={koalaHero} />
                <Link to="/news" className="more-news-link">
                    View all news →
                </Link>
            </section>
        </main>
    );
}

export default Home;