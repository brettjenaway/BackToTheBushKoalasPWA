// Reuseable news card to display news from the website

import './NewsCard.css';

function NewsCard({ title, date, category, image }) {
    return (
        <article className="news-card">
            <img src={image} alt="" className="news-card-image" />
            <div className="news-card-content">
                <p className="news-card-category">{category}</p>
                <h3>{title}</h3>
                <p className="news-card-date">{date}</p>
            </div>
        </article>
    );
}

export default NewsCard;