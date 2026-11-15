// Reuseable news card to display news from the website

import './NewsCard.css';
import { Link } from 'react-router-dom';

function NewsCard({ id, title, date, category, image }) {
    return (
        <Link to={`/news/${id}`} className="news-card-link">
            <article className="news-card">
                <img src={image} alt="" className="news-card-image" />
                <div className="news-card-content">
                    <span className="news-card-category">{category}</span>
                    <h3 className="news-card-title">{title}</h3>
                    <p className="news-card-date">{date}</p>
                </div>
            </article>
        </Link>
    );
}

export default NewsCard;