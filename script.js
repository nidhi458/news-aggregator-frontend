const apiKey = "f33dd6098115422e9de8c53fe338fcb9";
const newsContainer = document.getElementById("newsContainer");

//fetch top headlines initaially
window.onload  = () =>{
    getNews("general");
};

function getNews(category)
{
    fetch(`http://localhost:5000/news?category=${category}`)
    .then(res=>res.json())
    .then(data => {
        displayNews(data.articles);
    })
    .catch(err=>console.log("Error fetching news:", err));
}

function searchNews()
{
    const query = document.getElementById("searchInput").value;
    if(!query) return;
    fetch(`http://localhost:5000/search?q=${query}`)
    .then(res => res.json())
    .then(data=>{
        displayNews(data.articles);
    })
    .catch(err=>console.log("Error fetching news:", err));
    
}

function displayNews(articles)
{
    newsContainer.innerHTML ="";//clear old
    if(!articles || articles.length === 0){
        newsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }
    articles.forEach(article => {
    const imageUrl = article.urlToImage && article.urlToImage.trim() !== "" 
    ? article.urlToImage 
    : "https://via.placeholder.com/300x180?text=No+Image";
    const publishedDate = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString()
            : "Unknown date";
 // fallback

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
