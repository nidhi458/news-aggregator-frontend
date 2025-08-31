const newsContainer = document.getElementById("newsContainer");

// Random fallback images
const fallbackImages = [
    "https://source.unsplash.com/300x180/?news,1",
    "https://source.unsplash.com/300x180/?news,2",
    "https://source.unsplash.com/300x180/?news,3",
    "https://source.unsplash.com/300x180/?news,4"
];

function getRandomImage() {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

// Fetch top headlines initially
window.onload = () => {
    getNews("general");
};

function getNews(category) {
    fetch(`http://localhost:5000/news?category=${category}`) // replace with live backend URL after deployment
        .then(res => res.json())
        .then(data => displayNews(data.articles))
        .catch(err => console.log("Error fetching news:", err));
}

function searchNews() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;
    fetch(`http://localhost:5000/search?q=${query}`) // replace with live backend URL after deployment
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