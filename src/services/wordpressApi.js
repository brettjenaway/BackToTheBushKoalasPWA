// Wordpress API connection to the app
// This uses asynchronous javascript to wait for network requests to load and allow other processes to continue while it waits

// Points to Website URL defined in .env.local in :root folder
// Update the URL in .env.local file if website is moved or migrated to a different address
import * as he from 'he';

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;
const API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

function formatNewsArticle(article) {
    return {
        id: article.id,
        title: article.title.rendered,
        date: article.date,
        category: he.decode(article._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'), // use he to decode %amp; to an actual & sign
        image: article.acf?.news_image?.sizes?.thumbnail // Display thumbnail size image if available
            || article.acf?.news_image?.url // otherwise use original image url
            || null,
        imageLarge: article.acf?.news_image?.sizes?.large // Display large size image if available
            || article.acf?.news_image?.url // otherwise use original image url
            || null,
        imageAlt: article.acf?.news_image?.alt || '',
        excerpt: article.acf?.news_excerpt || '',
        content: article.acf?.news_article || ''
    };
}

//Get multiple news articles
export async function getLatestNews(number = 2) {
    const response = await fetch(`${API_URL}/posts?per_page=${number}&_embed`); // Get the latest {number} of articles for homepage. Default is 2 articles.

    if (!response.ok) {
        throw new Error('Failed to fetch news articles'); // Throw an error if response is not ok (not 200-299)
    }

    const articles = await response.json();

    return articles.map(formatNewsArticle);
}

//Get individual news article
export async function getNewsArticle(id) {
    const response = await fetch(`${API_URL}/posts/${id}?_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch news article');
    }

    const article = await response.json();

    return formatNewsArticle(article);
}