// Wordpress API connection to the app
// This uses asynchronous javascript to wait for network requests to load and allow other processes to continue while it waits

// Points to Website URL defined in .env.local in :root folder
// Update the URL in .env.local file if website is moved or migrated to a different address
const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;
const API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

export async function getLatestNews(number = 2) {
    const response = await fetch(`${API_URL}/posts?per_page=${number}&_embed`); // Get the latest {number} of articles for homepage. Default is 2 articles.

    if (!response.ok) {
        throw new Error('Failed to fetch news articles'); // Throw an error if response is not ok (not 200-299)
    }

    const articles = await response.json();

    return articles;
}