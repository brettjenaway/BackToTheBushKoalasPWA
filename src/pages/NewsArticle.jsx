// Individual news article

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsArticle } from '../services/wordpressApi';

import './NewsArticle.css';

function NewsArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadArticle() {
            try {
                const data = await getNewsArticle(id);
                if (!cancelled) {
                    setArticle(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        loadArticle();
        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return <main><p>Loading article...</p></main>;
    }

    if (error) {
        return <main><p>Unable to load article: {error}</p></main>;
    }

    if (!article) {
        return <main><p>Article not found.</p></main>;
    }

    return (
        <main className="news-article-page">
            <Link to="/news" className="news-article-back">← Back to News</Link>

            <header className="news-article-header">
                <span className="news-article-category">{article.category}</span>
                <h1 className="news-article-title">{article.title}</h1>
                <p className="news-article-date">{new Date(article.date).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</p>
            </header>

            {article.imageLarge && (<img src={article.imageLarge} className="news-article-image" />
            )}
            <div className="news-article-body">{article.content}</div>

        </main>
    );
}

export default NewsArticle;