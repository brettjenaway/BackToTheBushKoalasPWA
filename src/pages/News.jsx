import { useState, useEffect } from 'react';
import { getNewsPage } from '../services/wordpressApi';
import NewsCard from '../components/NewsCard';
import koalaHero from '../assets/koala-hero.jpg';
import './News.css';


function News() {

    const [articles, setArticles] = useState([]); // Stores news articles returned by WordPress
    const [loading, setLoading] = useState(true); // Flag to indicate if retrieving articles
    const [error, setError] = useState(null); // Stores error message in case of error
    const [page, setPage] = useState(1); // Stores the current page
    const [totalPages, setTotalPages] = useState(1); //Stores the total number of pages
    const [loadingMore, setLoadingMore] = useState(false); // Stores the state of the load more button
    const pageSize = 5; // Stores number of articles per page. Set this to 1 for testing purposes

    useEffect(() => {
        let cancelled = false; // Flag if the user navigates away from the page while the request is still running

        async function loadNews() {
            try {
                //Get 10 latest articles
                const data = await getNewsPage(1, pageSize);

                if (!cancelled) {
                    setArticles(data.articles); // If the API request succeeds, store the articles
                    setTotalPages(data.totalPages); // store the number of pages of news
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

    //Load the next page of news when Load More button is clicked
    async function loadMore() {
        setLoadingMore(true);
        setError(null);

        try {
            const nextPage = page + 1;
            const data = await getNewsPage(nextPage, pageSize);

            setArticles(previousArticles => [...previousArticles, ...data.articles]); // Add new articles to existing articles
            setPage(nextPage);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <main className="news-page">
            <header className="news-page-header page-header">
                <h1>Latest News & Updates</h1>
                <p>Follow the latest rehabilitation updates, news and rescue stories from Back to the Bush Koalas.</p>
            </header>

            <section className="news-list" aria-label="News articles">
                {loading ? (
                    <p>Loading news...</p>
                ) : articles.length === 0 && error ? (
                    <p>Unable to load news: {error}</p>
                ) : articles.length === 0 ? (
                    <p>No news articles available.</p>
                ) : (
                    articles.map((article) => (
                        <NewsCard
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            date={new Date(article.date).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                            category={article.category}
                            image={article.image || koalaHero}
                        />
                    ))
                )}

            </section>

            {error && articles.length > 0 && (<p role="alert">Unable to load more news: {error}</p>)}
            {/* Hide the load more button when no more articles exist */}
            {!loading && page < totalPages && (<button className="load-news-more" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load More'}
            </button>)}

        </main>
    )
}

export default News;