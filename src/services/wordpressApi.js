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
export async function getLatestNews(number = 2, page = 1) {
    const response = await fetch(`${API_URL}/posts?per_page=${number}&page=${page}&_embed`); // Get the latest {number} of articles for homepage. Default is 2 articles.

    if (!response.ok) {
        throw new Error('Failed to fetch news articles'); // Throw an error if response is not ok (not 200-299)
    }

    const articles = await response.json();

    return articles.map(formatNewsArticle);
}

// Get newws articles for news page
export async function getNewsPage(page = 1, perPage = 5) {
    const response = await fetch(`${API_URL}/posts?per_page=${perPage}&page=${page}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch news articles');
    }

    const data = await response.json();

    return {
        articles: data.map(formatNewsArticle),
        totalPages: Number(response.headers.get('X-WP-TotalPages'))
    };
}


//Get individual news article
export async function getNewsArticle(id) {
    const response = await fetch(`${API_URL}/posts/${id}?_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch news article');
    }

    const article = await response.json();
    9031
    return formatNewsArticle(article);
}

//Format koala API data
function formatKoala(koala) {
    return {
        id: koala.id,
        name: koala.title.rendered,
        image: koala.acf?.main_koala_photo?.sizes?.medium
            || koala.acf?.main_koala_photo?.url
            || null,
        imageLarge: koala.acf?.main_koala_photo?.sizes?.large
            || koala.acf?.main_koala_photo?.url
            || null,
        status: koala.acf?.koala_status || '',
        gender: koala.acf?.gender || '',
        age: koala.acf?.age || '',
        excerpt: koala.acf?.excerpt || '',
        story: koala.acf?.koala_story || '',
        rescueDate: koala.acf?.date_rescued || '',
        condition: koala.acf?.primary_condition || '',
        journeyRescued: koala.acf?.journey_rescued || '',
        journeyTreated: koala.acf?.journey_treated || '',
        journeyRehabilitation: koala.acf?.journey_rehabilitation || '',
        journeyReleased: koala.acf?.journey_released || ''
    }
}


//Get multiple koala stories
export async function getKoalas() {
    const response = await fetch(`${API_URL}/koala?per_page=20`); // Get the latest {number} of articles for homepage. Default is 2 articles.

    if (!response.ok) {
        throw new Error('Failed to fetch koala stories'); // Throw an error if response is not ok (not 200-299)
    }

    const koalas = await response.json();

    return koalas.map(formatKoala);
}

//get one koala story
export async function getKoala(id) {
    const response = await fetch(`${API_URL}/koala/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch koala story');
    }
    const koala = await response.json();

    return formatKoala(koala);
}