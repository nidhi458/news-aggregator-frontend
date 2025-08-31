const newsContainer = document.getElementById("newsContainer");

// Random fallback images
const fallbackImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2VuZXJhbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1685366454581-796f5fc832c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D"
];

function getRandomImage() {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

// Fetch top headlines initially
window.onload = () => {
    getNews("general");
};

function getNews(category) {
    fetch(`https://news-aggregator-backend-5opt.onrender.com/news?category=${category}`) // replace with live backend URL after deployment
        .then(res => res.json())
        .then(data => displayNews(data.articles))
        .catch(err => console.log("Error fetching news:", err));
}

function searchNews() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;
    fetch(`https://news-aggregator-backend-5opt.onrender.com/search?q=${query}`) // replace with live backend URL after deployment
        .then(res => res.json())
        .then(data => displayNews(data.articles))
        .catch(err => console.log("Error fetching news:", err));
}

function displayNews(articles) {
    newsContainer.innerHTML = ""; // clear old

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    articles.forEach(article => {
        const imageUrl = article.urlToImage && article.urlToImage.trim() !== ""
            ? article.urlToImage
            : getRandomImage();

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${imageUrl}" alt="News image">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(card);
    });
}