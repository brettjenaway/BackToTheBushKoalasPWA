import './KoalaCard.css';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function KoalaCard({ id, name, image, status, gender, excerpt, isSaved, onToggleSaved }) {
    return (
        <article className="koala-card">
            <div className="koala-card-image"><img src={image} alt={name} /></div>
            <div className="koala-card-content">
                <div className="koala-card-top-row">
                    <div className="koala-card-badges">
                        <span className="koala-card-status">{status}</span>
                        <span className={`koala-card-gender koala-card-gender-${gender?.toLowerCase()}`}>{gender}</span>
                    </div>

                    <button
                        type="button"
                        className="koala-save-heart"
                        onClick={onToggleSaved}                    >
                        <Heart
                            size={22}
                            fill={isSaved ? 'currentColor' : 'none'}
                        />
                    </button>
                </div>

                <h2 className="koala-card-name">{name}</h2>
                <p className="koala-card-excerpt">{excerpt}</p>
                <Link to={`/koalas/${id}`} className="koala-read-story" state={{ returnToKoala: id }}>
                    Read Full Story →
                </Link>
                {/* <button type="button" className={`koala-save-button ${isSaved ? 'is-saved' : ''}`}
                    onClick={onToggleSaved}>
                    {isSaved ? '♥ Saved' : '♡ Save Koala'}
                </button> */}
            </div>
        </article>
    );
}

export default KoalaCard;