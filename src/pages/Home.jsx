import { Link } from 'react-router-dom'; // Navigation package
import koalaHero from '../assets/koala-hero.jpg'; // Image on homepage
import NewsCard from '../components/NewsCard';
import './Home.css';
import { Leaf } from 'lucide-react';

import { useState, useEffect } from 'react';
import { getLatestNews } from '../services/wordpressApi';

function Home() {

    const [articles, setArticles] = useState([]); // Stores news articles returned by WordPress
    const [loading, setLoading] = useState(true); // Flag to indicate if retrieving articles
    const [error, setError] = useState(null); // Stores error message in case of error

    useEffect(() => {
        let cancelled = false; // Flag if the user navigates away from the page while the request is still running

        async function loadNews() {
            try {
                const data = await getLatestNews(2);

                if (!cancelled) {
                    setArticles(data); // If the API request succeeds, store the articles
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message); // If the API request fails, store an error message 
                }
            } finally {
                if (!cancelled) {
                    setLoading(false); // Runs no matter if request succeeds or fails, and sets loading to false
                }
            }
        }
        loadNews();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className="home-page">

            <section className="home-hero">
                <Leaf className="home-header-leaf" />
                <div className="home-hero-content">
                    <p className="home-hero-eyebrow">Welcome to</p>
                    <h1>Back to the Bush Koalas</h1>
                    <p className="home-hero-description">
                        Discover koala stories. Follow their recovery.
                        Help them return to the bush.
                    </p>
                </div>
            </section>

            <section className="home-content">
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

                    {/* Insert data from API */}
                    {loading ? ( // Conditional rendering to display different <P> elements depending on the condition
                        <p>Loading latest news...</p>
                    ) : error ? (
                        <p>Unable to load news: {error}</p>
                    ) : articles.length === 0 ? (
                        <p>No news articles available</p>
                    ) : (
                        articles.map((article) => (
                            <NewsCard
                                key={article.id}
                                id={article.id}
                                title={article.title}
                                date={new Date(article.date).toLocaleDateString('en-AU', { // convert dates to readable date text
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                                category={article.category}
                                image={article.image || koalaHero}  // display news image or default koala hero image if no article image is found
                            />
                        ))
                    )}

                    <Link to="/news" className="more-news-link">
                        View all news →
                    </Link>
                </section>
            </section>
        </main>
    );
}

export default Home;